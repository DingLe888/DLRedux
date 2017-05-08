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

class DateTimePicker extends Component {

    static propTypes = {
        lastTime: PropTypes.string,
        startTime: PropTypes.string,
        selectedTime: PropTypes.string,

        onTimeChange:PropTypes.func,

        itemHeight:PropTypes.number,
    };

    constructor(props) {
        super(props);
        this.setSelectedData(this.props);
        this.lastTimeDate = moment(this.props.lastTime);
        this.startTimeDate = moment(this.props.startTime);
    }

    componentWillReceiveProps(nowProps) {
        // 初始化选中数据
        this.setSelectedData(nowProps);
        return true
    }

    setSelectedData(nowProps) { // 记录选中
        let selectedDate = moment(nowProps.selectedTime);
        this._selectedYear = selectedDate.get('year');
        this._selectedMonth = selectedDate.get('month') + 1;
        this._selectedDay = selectedDate.get('date');

    }
    componentDidUpdate() {
        this._yearPicker.scrollToIndex(this._yearSelectedIndex);
        this._monthPicker.scrollToIndex(this._monthSelectedIndex);
        this._dayPicker.scrollToIndex(this._daySelectedIndex);
    }
    render() {
        return (
            <View style={styles.container}>
                {this.getYearPicker()}
                {this.getMonthPicker()}
                {this.getDayPicker()}
            </View>
        )
    }

    _yearData=[];
    _yearSelectedIndex=0;
    getYearPicker() {
        if (this._yearData.length == 0) {
            let startYear = this.startTimeDate.get('year');
            let lastYear = this.lastTimeDate.get('year');
            var yearData = [];

            if(__DEV__){
                console.log('可选年 数据集',startYear,lastYear);
            }



            for (var i = 0; i <= (lastYear - startYear); i++) {
                let value = startYear + i;
                let label = value + '年';
                yearData.push({value, label});

                if(__DEV__) {
                    console.log('+1');
                }

            }
            this._yearData = yearData;
        }
        this._yearSelectedIndex = this._selectedYear - this._yearData[0].value;

        return (
            <DLPicker data={this._yearData}
                      itemHeight={this.props.itemHeight}
                      onSelectedItem={this._onSelectedYearItem.bind(this)}
                      selectedIndex={this._yearSelectedIndex}
                      ref={(picker)=>this._yearPicker=picker}
                      key={'year'}
            />
        )
    }

    _onSelectedYearItem(itemData) {
        this._selectedYear=itemData.value;

        this.putSelectedTimeStr()
    }

    _monthData=[];
    _monthSelectedIndex=0;
    getMonthPicker(){

       if (this._monthData.length == 0){
           var months = [1,2,3,4,5,6,7,8,9,10,11,12];
           this._monthData = months.map((value)=>{
               return {value,label:value+'月'}
           });
       }
        this._monthSelectedIndex = this._selectedMonth - 1;
        return (
            <DLPicker data={this._monthData}
                      itemHeight={this.props.itemHeight}
                      onSelectedItem={this._onSelectedMonthItem.bind(this)}
                      selectedIndex={this._monthSelectedIndex}
                      ref={(picker)=>this._monthPicker=picker}
                      key={'month'}

            />
        )
    }
    _onSelectedMonthItem(itemData){
        this._selectedMonth=itemData.value;
        this.putSelectedTimeStr()
    }

    _dayData=[];
    _daySelectedIndex=0;
    getDayPicker(){
        if(this._dayData.length == 0){
            let selectedDateFormat = this._selectedYear + '-' + this._selectedMonth;
            let daysNum = moment(selectedDateFormat,'YYYY-MM').daysInMonth();

            for(var i =0;i<daysNum;i++){
                this._dayData.push({value:i+1,label:(i+1) + '日'});
            }
        }



        this._daySelectedIndex = this._selectedDay - 1;

        return (
            <DLPicker data={this._dayData}
                      itemHeight={this.props.itemHeight}
                      onSelectedItem={this._onSelectedDayItem.bind(this)}
                      selectedIndex={this._daySelectedIndex}
                      ref={(picker)=>this._dayPicker=picker}
                      key={'day'}
            />

        )
    }
    _onSelectedDayItem(itemData){
        this._selectedDay=itemData.value;
        this.putSelectedTimeStr()
    }

    putSelectedTimeStr(){ // 组装最终数据 -- 上传给父组件
        let yearStr = this._selectedYear;
        let monthStr = padStart(this._selectedMonth,2,'0');
        let dayStr = padStart(this._selectedDay,2,'0');
        let timeStr = yearStr + '-' + monthStr + '-' + dayStr
        this.props.onTimeChange(timeStr)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'stretch',
    }

});

export default DateTimePicker;