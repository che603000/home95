import {WATERING_CHANGE_VALUE} from '../consts/action-name'

export const changeValue = (id, key, value) => dispatch => {
    dispatch({type: WATERING_CHANGE_VALUE, payload: {id, key, value}});
};