import {WATERING_CHANGE_VALUE, WATERING_EDIT} from '../consts/action-name';

const change = (state, payload) => {
    const {key, value} = payload;
    return {...state, [key]: value};
};

export default (state = {}, action) => {
    const {type, payload = {}} = action;


    switch (type) {
        case WATERING_CHANGE_VALUE: {
            const {id} = payload;
            return state.map(item => {
                if (item.id === id) {
                    return change(item, payload);
                } else
                    return item;
            });
        }
        case WATERING_EDIT: {
            const {item: values} = payload;
            return state.map(item => {
                if (item.id === values.id) {
                    return  values;
                } else
                    return item;
            });
        }
        default:
            return state;
    }
};