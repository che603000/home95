import {connect} from 'mqtt';
import {mqtt} from '../config'

const createId = () => Math.random() * 1000 | 0;

class Mqtt {
    constructor(options) {
        this.replyHash = {};
        this.options = options;
        this.topics = [];
        this.historyTopic = `/rpc/v1/db_logger/history/get_values/contactless-${options.clientId}`;
    }

    requestHistory(options) {
        const {rangeDate, ...params} = options;
        return new Promise((res, rej) => {
            const id = createId();
            const options = {
                id,
                params: {
                    limit: 10000,
                    ver: 1,
                    min_interval: 1000 * 60,
                    channels: [["hwmon", "CPU Temperature"]],
                    timestamp: {
                        lt: Date.parse(rangeDate[1]) / 1000,
                        gt: (Date.parse(rangeDate[0]) || Date.now()) / 1000
                    },
                    ...params
                }
            };
            this.replyHash[id] = res;
            this.ready.then(() => this.client.publish(this.historyTopic, JSON.stringify(options)))
        });
    }

    init(topics = []) {
        this.topics = topics;
        const {connectString, clientId} = mqtt;

        this.ready = new Promise((res) => {
            const client = connect(connectString, {clientId});
            client.on('connect', (err) => {
                if (err)
                    console.log(err);
                res(client);

            });
        })
            .then(client => {
                client.on('message', (topic, message) => {
                    if (this.isHistoryTopic(topic))
                        this.messageHistory(topic, message);
                    else
                        this.messageHandler(topic, message);
                });
                return client;
            })
            .then(client => {
                client.subscribe(`${this.historyTopic}/reply/#`, (err) => {
                    if (err) {
                        console.log(err);
                        throw new Error('Error MQTT: subscribe topic');
                    }
                });
                return client;
            })
            .then(client => {
                this.topics.forEach(topic => {
                    const {name} = topic;
                    client.subscribe(name, (err) => {
                        if (err) {
                            console.log(err);
                            throw new Error('Error MQTT: subscribe topic');
                        }
                    });
                });
                return client;
            })
            .then(client => {
                this.client = client;
                return client;
            })

        return this.ready;
    }

    isHistoryTopic(topic) {
        return topic.startsWith(this.historyTopic);
    }

    messageHistory(topic, message) {
        const {id, ...params} = JSON.parse(message.toString());
        const res = this.replyHash[id];
        if (res) {
            res(params);
            delete this.replyHash[id];
        }
    }

    messageHandler(topic, message) {
        const targetTopic = this.topics.find(t => t.name === topic);
        if (targetTopic) {
            const res = JSON.parse(message.toString());
            targetTopic.handler(res);
        }
    }


}


export default new Mqtt(mqtt);




