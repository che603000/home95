import {connect} from 'mqtt';
//const createId = () => Math.random() * 1000 | 0;

const connectMQTT = (connectString, clientId) => new Promise((res, rej) => {
    const client = connect(connectString, {clientId});
    client.on('connect', (err) => {
        if (err)
            console.log(err);
        //rej(err);
        //else
            res(client);

    });
});

export default options => {
    const {
        clientId = 'homeApp',
        connectString = 'ws://192.168.1.35:18883/mqtt',
        topics = []
    } = options || {};

    connectMQTT(connectString, clientId)
        .then(client => {
            client.on('message', (topic, message) => {
                const targetTopic = topics.find(t => t.name === topic);
                if (targetTopic) {
                    const res = JSON.parse(message.toString());
                    targetTopic.handler(res);
                } else
                    try {
                        console.log({topic, data: JSON.parse(message.toString())});
                    } catch(e){
                        console.log({topic, mes: message.toString()});
                    }
            });
            return client;
        })
        .then(client => {
            topics.forEach(topic => {
                const {name} = topic;
                client.subscribe(name, (subErr) => {
                    if (subErr) {
                        console.log(subErr);
                        throw new Error('Error MQTT: subscribe topic');
                    }
                });
            });
            return client;
        })
};



