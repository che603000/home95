import {TEMPERATURE_CHANGE_VALUE, HUMIDITY_CHANGE_VALUE, BATTERY_LOW} from "../consts/action-name";

import store from '../store';

export const temperatureValue = (value) => {
    store.dispatch({type: TEMPERATURE_CHANGE_VALUE, payload: {value}});
};

export const humidityValue = (value) => {
    store.dispatch({type: HUMIDITY_CHANGE_VALUE, payload: {value}});
};

export const batteryLow = (value) => {
    store.dispatch({type: BATTERY_LOW, payload: {value: !!value}});
};

