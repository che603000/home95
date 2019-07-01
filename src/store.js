import {composeWithDevTools} from 'redux-devtools-extension';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {waterings} from './config';
import rootReducer from './reducers';


const store = createStore(
    rootReducer,
    {waterings},
    composeWithDevTools(applyMiddleware(thunk))
    //composeWithDevTools(applyMiddleware(thunk))
);

export default store;