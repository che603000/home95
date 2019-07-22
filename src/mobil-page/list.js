import React, {Component} from 'react';
import {connect} from "react-redux";

import {List, ListItem, ListItemText} from '@material-ui/core';

const Item = props => {
    const {primary, secondary} = this.props;
    return (
        <ListItem>
            <ListItemText
                primary={primary}
                secondary={secondary}
            />
        </ListItem>
    )
};

class List extends Component {
    render() {
        const {dense, items} = this.props;
        return (
            <List dense={dense}>
                {items.map(item => <Item key={item.id} {...item}/>)}
            </List>
        )
    }
}


const selected = (state) => {
    return {weather: state.weather};
};

export default connect(selected, {})(List);
