import {combineReducers} from 'redux';

import waterings from './waterings';
import weather from './weather';

export default combineReducers({
    weather,
    waterings
})