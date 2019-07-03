import {WATERING_CHANGE_VALUE, WATERING_EDIT} from '../consts/action-name'

export const changeValue = (id, key, value) => dispatch => {
    dispatch({type: WATERING_CHANGE_VALUE, payload: {id, key, value}});
};

export const wateringSave = (item) => dispatch => {
    dispatch({type: WATERING_EDIT, payload: {item}});
};