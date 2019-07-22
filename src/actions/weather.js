import {BATTERY_LOW, HUMIDITY_CHANGE_VALUE, TEMPERATURE_CHANGE_VALUE, TEMPERATURE_HISTORY} from "../consts/action-name";

import store from '../store';
import providerMqtt from '../utils/mqtt';

export const temperatureValue = (value) => {
    store.dispatch({type: TEMPERATURE_CHANGE_VALUE, payload: {value}});
};

export const humidityValue = (value) => {
    store.dispatch({type: HUMIDITY_CHANGE_VALUE, payload: {value}});
};

export const batteryLow = (value) => {
    store.dispatch({type: BATTERY_LOW, payload: {value: !!value}});
};

export const temperatureHistory = (channels) => dispatch => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setHours(endDate.getHours() - 23);

    const params = {
        rangeDate: [startDate.toISOString(), endDate.toISOString()],
        //channels: [["oregon_rx_1D20_A6_1", "Temperature"]],
        channels: [channels],
    };

    providerMqtt.requestHistory(params)
        .then(data => {
            const values = data.result.values.map(item => ({
                value: +((+item.v) + 0.5).toFixed(1),
                date: new Date(item.t * 1000)
            }));
            dispatch({type: TEMPERATURE_HISTORY, payload: {values}});
        })
};