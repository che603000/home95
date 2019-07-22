const digestRequest = require('request-digest')('admin', 'lineline2011');

const xml=`<request id="0"><command name="interface hide-ssid"><no>no</no><name>AccessPoint</name></command></request><request id="1"><command name="interface authentication wpa-psk"><psk>lineline2011</psk><name>AccessPoint</name></command></request><request id="2"><command name="interface encryption key"><id>1</id><no/><name>AccessPoint</name></command></request><request id="3"><command name="interface encryption key"><id>2</id><no/><name>AccessPoint</name></command></request><request id="4"><command name="interface encryption key"><id>3</id><no/><name>AccessPoint</name></command></request><request id="5"><command name="interface encryption key"><id>4</id><no/><name>AccessPoint</name></command></request><request id="6"><command name="interface channel"><name>WifiMaster0</name><channel>1</channel></command></request><request id="7"><command name="interface compatibility"><name>WifiMaster0</name><annex>BGN</annex></command></request><request id="8"><command name="interface power"><name>WifiMaster0</name><power>100</power></command></request><request id="9"><command name="interface up"><no>no</no><name>AccessPoint</name></command></request><request id="10"><command name="interface ssid"><ssid>Home95~</ssid><name>AccessPoint</name></command></request><request id="11"><command name="interface encryption enable"><name>AccessPoint</name></command></request><request id="12"><command name="interface encryption wpa2"><name>AccessPoint</name></command></request><request id="13"><command name="interface encryption wpa"><name>AccessPoint</name></command></request><request id="14"><command name="system config-save"><name>AccessPoint</name></command></request>`;
digestRequest.request({
    host: 'http://192.168.1.2',
    path: '/ci',
    port: 80,
    method: 'POST',
    //body: '<request id="0"><command name="interface up"><no>no</no><name>AccessPoint</name></command></request>', //OFF
    body: '<request id="0"><command name="interface up"><name>AccessPoint</name></command></request>', //ON
    //body: xml,
    headers: {
        'Content-Type': 'application/xml',
        Cookie: '_authorized=admin'
        //'Custom-Header': 'OneValue',
        //'Other-Custom-Header': 'OtherValue'
    }
}, function (error, response, body) {
    debugger;
    if (error) {
        throw error;
    }

    console.log(body);
});