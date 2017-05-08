/**
 * Created by dingle on 16/12/6.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';
// import moment from 'moment';

import WeekView from './WeekView'
const DEVICE_WIDTH = Dimensions.get('window').width;

export default class MonthView extends Component {


    static defaultProps = {
        onClickOneDay:()=>{console.log('MonthView ddd-- 点击了日子')},
        weekDataArray:[]
    }

    shouldComponentUpdate(nextProps,nextState) {

        return nextProps.monthKey != this.props.monthKey
    }


    render() {
        return (
            <View
                style={styles.MonthViewStyle}>
                {this.getWeekViews()}
            </View>
        );
    }
    getWeekViews(){
         let weekArr = [];
        // let firstDay = moment(this.props.year + '-' + this.props.month + '-' +'1','YYYY-MM-DD');
        let weekDaysArray = this.props.weekDataArray;

        for (let i=0;i<weekDaysArray.length;i++) {
            weekArr.push(
                <WeekView key={i}
                days={weekDaysArray[i]}
                onClickOneDay = {this.props.onClickOneDay}
            />
            )
        }
        return(
            weekArr
        )
    }

}

const styles = StyleSheet.create({
    MonthViewStyle:{
        width:DEVICE_WIDTH,
        alignItems:'stretch',
        backgroundColor:'#e1e8f1',
        borderBottomColor:'#e1e8f1',
        borderBottomWidth:1
    },

});

