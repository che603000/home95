import {connect} from 'mqtt';

const clientId = 'home95';

const temperatureTopic = `/rpc/v1/db_logger/history/get_values/contactless-${clientId}`;

const client = connect('ws://192.168.1.108:18883/mqtt', {clientId});

const createId = () => Math.random() * 1000 | 0;

const getTemperature = (params) => {
    const id = createId();
    client.publish(temperatureTopic, JSON.stringify({
        id,
        params: {
            limit: 1000,
            ver: 1,
            min_interval: 0,
            ...params
        }
    }));
    return id;
};


client.on('connect', () => {
    client.subscribe(`${temperatureTopic}/reply/#`, function (err) {
        if (err)
            debugger;
    });

    const params = {
        "channels": [["wb-w1", "28-011831bb08ff"]],
        "timestamp": {"gt": Date.parse('2019-06-29') / 1000, "lt": Date.parse('2019-07-01') / 1000}
    };
    getTemperature(params);

});

client.on('error', err => {
    console.log(err);
});

client.on('message', function (topic, message) {
    const o = JSON.parse(message.toString());
    console.log({topic, ...o});
});