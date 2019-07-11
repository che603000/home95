import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './mobil-app';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';


import {temperatureValue, humidityValue, batteryLow} from './actions/weather';
import providerMqtt from './utils/mqtt';

providerMqtt.init([
    {
        name: '/devices/oregon_rx_1D20_A6_1/controls/Battery low',
        handler: (value) => batteryLow(value)
    },
    {
        name: '/devices/oregon_rx_1D20_A6_1/controls/Temperature',
        handler: (value) => temperatureValue(value)
    },
    {
        name: '/devices/oregon_rx_1D20_A6_1/controls/Humidity',
        handler: (value) => humidityValue(value)
    }
]);

ReactDOM.render((
    <BrowserRouter>
        <App/>
    </BrowserRouter>
), document.getElementById('root'));

serviceWorker.unregister();


