const mqtt = require('mqtt');

const client = mqtt.connect('ws://192.168.1.108:18883/mqtt');

const t = "/devices/#";
//const t = "/devices/wb-mr6c_159/controls/K1/on";
const topicRpc = '/rpc/v1/db_logger/#';

const params = {id: "home95-1", params: {"channels": [["wb-w1", "28-05eb5ff"]], "limit": 1000, "ver": 1}};

client.on('connect', function () {
    client.subscribe(topicRpc, function (err) {
        // if (!err) {
        //     client.publish('presence', 'Hello mqtt')
        // }
    });

    const list = '/rpc/v1/db_logger/history/get_channels/contactless-Lpc3DeieYe'; // {"id":2,"params":{}}
    const list1='/rpc/v1/db_logger/history/get_values/contactless-Home95list';
    const reqData ={"id": "home95-78","params":{"channels":[["wb-w1","28-011831bb08ff"]],"limit":1000,"ver":1,"timestamp":{"gt":1561841999,"lt":1561928400},"min_interval":0}};
    client.publish(list1, JSON.stringify(reqData));

    // const r = '/rpc/v1/db_logger/history/get_values/contactless-fuQAxT3xsQ';
    // rpc.call(r, {"id": 20} )
    //     .then((response) => {
    //         console.log("example/hello response: ", response);
    //         debugger;
    //         rpc.end()
    //     })
    //     .catch(err=>{
    //         console.log(err);
    //         debugger;
    //     })


    //let flag = false;
    // setInterval(() => {
    //     flag = !flag;
    //     client.publish(t, flag ? "1" : "0");
    // }, 1000)
});

client.on('error', err => {
    console.log(err);
});

client.on('message', function (topic, message) {
    // message is Buffer
    const data = message.toString();
    //debugger;
    if(topic ==='/rpc/v1/db_logger/history/get_values/contactless-Home95list/reply'){
        const o = JSON.parse(data);
        console.log(o);
        //debugger;
    }
    console.log(topic, data);
    //client.end()
});

