const mqtt = require('mqtt');

const client = mqtt.connect('ws://192.168.1.108:18883/mqtt');

const cronTopic = "/devices/app-cron/controls/area1";
const tempTopic = '/devices/wb-w1/controls/28-011831bb08ff';

const time = '0/2 * * * * *';

client.on('error', err => {
    console.log(err);
});

client.on('message', function (topic, message) {
    // message is Buffer
    const data = message.toString();
    //const o = JSON.parse(data);
    JSON.stringify()
    console.log(topic, data);
});

client.on('connect', function () {
    client.subscribe(cronTopic + '/#', function (err) {
        if (err)
            debugger;
    });


    //client.publish(cronTopic+"/meta/type", "text", {retain: true});
    client.publish(`${cronTopic}`, time, {retain: true});

});


const d = {"spec": "0 * * * * *"}