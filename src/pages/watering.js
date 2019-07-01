import React, {Component} from "react";
import {connect} from "react-redux";
import {changeValue as onChange} from '../actions/watering';
import {CardWatering} from '../components/card';


class Waterings extends Component {
    render() {
        const {items, onChange} = this.props;
        return items.map(item => <CardWatering key={item.id} {...item} onChange={onChange}/>);
    }
}


const selected = (state) => {
    return {items: state.waterings};
};

export default connect(selected, {onChange})(Waterings);