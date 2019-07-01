import {WATERING_CHANGE_VALUE} from '../consts/action-name';

const change = (state, payload) => {
    const {key, value} = payload;
    return {...state, [key]: value};
};

export default (state = {}, action) => {
    const {type, payload = {}} = action;
    const {id} = payload;

    switch (type) {
        case WATERING_CHANGE_VALUE: {
            return state.map(item => {
                if (item.id === id) {
                    return change(item, payload);
                } else
                    return item;
            });
        }
        default:
            return state;
    }
};