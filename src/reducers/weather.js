import {combineReducers} from 'redux';
import {TEMPERATURE_CHANGE_VALUE, HUMIDITY_CHANGE_VALUE, BATTERY_LOW} from "../consts/action-name";


const temperature = (state = "?", action) => {
    const {type, payload = {}} = action;

    switch (type) {
        case TEMPERATURE_CHANGE_VALUE: {
            return payload.value
        }
        default:
            return state;
    }
};
const humidity = (state = 0, action) => {
    const {type, payload = {}} = action;

    switch (type) {
        case HUMIDITY_CHANGE_VALUE: {
            return payload.value
        }
        default:
            return state;
    }
};
const batteryLow = (state = false, action) => {
    const {type, payload = {}} = action;

    switch (type) {
        case BATTERY_LOW: {
            return payload.value
        }
        default:
            return state;
    }
};


export default combineReducers({
    temperature,
    humidity,
    batteryLow
});