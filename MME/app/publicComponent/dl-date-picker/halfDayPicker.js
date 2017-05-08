/**
 * Created by dingle on 2017/4/1.
 */
import React, {Component, PropTypes}from 'react';

import {
    View,
    StyleSheet,

} from 'react-native';

import DLPicker from './dlPicker'
var moment = require('moment');

class HalfDayPicker extends Component {

    static propTypes = {
        selectedTime: PropTypes.string,
        onTimeChange:PropTypes.func.isRequired,

        itemHeight:PropTypes.number,
    };

    constructor(props) {
        super(props);
        this.setSelectedData(this.props);
    }

    componentWillReceiveProps(newProps) {
        this.setSelectedData(newProps);
    }

    componentDidUpdate() {
        this._halfPicker.scrollToIndex(this._halfSelectedIndex);
    }
    setSelectedData(newProps){
        let selectedDate = moment(newProps.selectedTime);
        // 初始化选中数据
        this._selectedHalf=selectedDate.get('hour') > 12 ? 1 : 0;
    }

    render() {
        return (
            <View style={styles.container}>
                {this.getHalfDayPicker()}

            </View>
        )
    }

    _halfData=[];
    _halfSelectedIndex=0;
    getHalfDayPicker() {
        if (this._halfData.length == 0) {

            this._halfData = [{value:0,label:'上午'},{value:1,label:'下午'}];
        }
        this._halfSelectedIndex = this._selectedHalf;

        return (
            <DLPicker data={this._halfData}
                      itemHeight={this.props.itemHeight}
                      onSelectedItem={this._onSelectedHalfDayItem.bind(this)}
                      selectedIndex={this._halfSelectedIndex}
                      ref={(picker)=>this._halfPicker=picker}
            />
        )
    }

    _onSelectedHalfDayItem(itemData) {
        this._selectedHalf = itemData.value;
        this.props.onTimeChange(itemData.value)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
    }

});

export default HalfDayPicker;

