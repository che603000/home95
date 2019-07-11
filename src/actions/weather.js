import {TEMPERATURE_CHANGE_VALUE, HUMIDITY_CHANGE_VALUE, BATTERY_LOW, TEMPERATURE_HISTORY} from "../consts/action-name";

import store from '../store';
import providerMqtt from '../utils/mqtt';
import dateForamt from 'dateformat';

export const temperatureValue = (value) => {
    store.dispatch({type: TEMPERATURE_CHANGE_VALUE, payload: {value}});
};

export const humidityValue = (value) => {
    store.dispatch({type: HUMIDITY_CHANGE_VALUE, payload: {value}});
};

export const batteryLow = (value) => {
    store.dispatch({type: BATTERY_LOW, payload: {value: !!value}});
};

export const temperatureHistory = () => dispatch => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setHours(endDate.getHours() - 23);

    const params = {
        rangeDate: [startDate.toISOString(), endDate.toISOString()],
        channels: [["oregon_rx_1D20_A6_1", "Temperature"]],
    };

    providerMqtt.requestHistory(params)
        .then(data => {

            const groupHour = data.result.values.reduce((res, item) => {
                const date = new Date(item.t * 1000);
                const key = dateForamt(date, 'dd/mm HH:00');//`${date.getDate()}-${date.getHours()}`;
                //const key = dateForamt(date, 'dd/mm HH:00');//`${date.getDate()}-${date.getHours()}`;
                res[key] = res[key] || {index: 0, value: 0};
                res[key].index++;
                res[key].value += (+item.v);
                return res;
            }, {});

            const values = Object.keys(groupHour)
                .map(key => {
                    const item = groupHour[key];
                    return {
                        key,
                        value: +(item.value / item.index).toFixed(1)
                    }
                });

            dispatch({type: TEMPERATURE_HISTORY, payload: {values}});
        })
};