import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import store from './store';

import AppBar from './mobil-page/app-bar';
import Temp from './mobil-page/temperature';
//import Card from './mobil-page/card';
import Edit from './mobil-page/watering-edit';
import WateringList from './mobil-page/watering-list';

function App() {
    return (
        <Provider store={store}>
                <Router>
                    <AppBar/>
                    <Switch>
                        <Route path='/home' component={Temp}/>
                        <Route path='/waterings' component={WateringList}/>
                        <Route path='/watering/:id' component={Edit} />
                    </Switch>
                </Router>
        </Provider>
    );
}

export default App;
