/**
 * Created by dingle on 2017/4/1.
 */
/**
 * Created by dingle on 2017/3/31.
 */
import React, {Component, PropTypes}from 'react';

import {
    View,
    StyleSheet,

} from 'react-native';
var moment = require('moment');
import DLPicker from './dlPicker'
import {padStart} from './numberTool'

class TimePicker extends Component {

    static propTypes = {
        selectedTime: PropTypes.string,
        // 每天可用的时间区间 0~23点
        workStartTime:PropTypes.number.isRequired,
        workEndTime:PropTypes.number.isRequired,

        // 多少分钟间隔
        period:PropTypes.number.isRequired,

        onTimeChange:PropTypes.func,

        itemHeight:PropTypes.number,
    };

    constructor(props) {
        super(props);
        this.setSelectedData(this.props);
    }

    componentWillReceiveProps(nowProps,newState) {
        // 初始化选中数据
       this.setSelectedData(nowProps);
        return true
    }

    setSelectedData(nowProps){
        // 初始化选中数据
        let selectedDate = moment(nowProps.selectedTime);
        var nowHour = selectedDate.get('hour');

        nowHour = nowHour > this.props.workEndTime ? this.props.workEndTime : nowHour;
        nowHour = nowHour < this.props.workStartTime ? this.props.workStartTime : nowHour;
        this.selectedHour=nowHour;
        this.selectedMinute = Math.floor(selectedDate.get('minute') / this.props.period) * this.props.period;
    }

    componentDidUpdate() {
        this._hourPicker.scrollToIndex(this._hourSelectedIndex);
        this._minutePicker.scrollToIndex(this._minuteSelectedIndex);
    }

    render() {
        return (
            <View style={styles.container}>
                {this.getHourPicker()}
                {this.getMinutePicker()}
            </View>
        )
    }

    _hourData=[];
    _hourSelectedIndex=0;
    getHourPicker() {
        if (this._hourData.length == 0) {

            var hourData = [];
            for (var i = 0; i <= (this.props.workEndTime - this.props.workStartTime); i++) {
                let value = this.props.workStartTime + i;
                let label = value + '点';
                hourData.push({value, label});
            }
            this._hourData = hourData;
        }

        this._hourSelectedIndex = this.selectedHour - this._hourData[0].value;
        if(__DEV__){
            console.log('滚动到对应小时：index',this._hourSelectedIndex,this.selectedHour,this._hourData[0].value);
        }
        return (
            <DLPicker data={this._hourData}
                      itemHeight={this.props.itemHeight}
                      onSelectedItem={this._onSelectedHourItem.bind(this)}
                      selectedIndex={this._hourSelectedIndex}
                      ref={(picker)=>this._hourPicker=picker}
            />
        )
    }

    _onSelectedHourItem(itemData) {
            this.selectedHour = itemData.value;
            if(itemData.value == this.props.workEndTime && this.selectedMinute != 0){
                this._minutePicker.scrollToIndex(0);
                let maxTime= padStart(this.props.workEndTime,2,'0') + ':00';
                this.props.onTimeChange(maxTime)
            }else {
                this.putSelectedTimeStr();
            }

    }

    _minuteData=[];
    _minuteSelectedIndex=0;
    getMinutePicker() {
        if (this._minuteData.length == 0) {

            var minuteData = [];
            for (var i = 0; i <60; i+=this.props.period) {
                let value = i;
                let label = i + '分';
                minuteData.push({value, label});
            }
            this._minuteData = minuteData;
        }
        this._minuteSelectedIndex = Math.floor(this.selectedMinute / this.props.period);
        console.log('滚动到对应分钟：index',this._minuteSelectedIndex,this.selectedMinute)

        return (
            <DLPicker data={this._minuteData}
                      itemHeight={this.props.itemHeight}
                      onSelectedItem={this._onSelectedMinuteItem.bind(this)}
                      selectedIndex={this._minuteSelectedIndex}
                      ref={(picker)=>this._minutePicker=picker}
            />
        )
    }

    _onSelectedMinuteItem(itemData) {
        this.selectedMinute = itemData.value;

        // 选中最后小时数时分钟数只能为 0
        if(this.selectedHour == this.props.workEndTime && this.selectedMinute != 0){
            this._minutePicker.scrollToIndex(0);

        }else {
            this.putSelectedTimeStr();
        }

    }

    putSelectedTimeStr(){ // 组装最终数据 -- 上传给父组件
        let hourStr = padStart(this.selectedHour,2,'0');
        let minuteStr = padStart(this.selectedMinute,2,'0');
        let timeStr = hourStr + ':' + minuteStr;
        this.props.onTimeChange(timeStr)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1.5,
        flexDirection: 'row',
        alignItems: 'stretch',
    }

});

export default TimePicker;