/**
 * Created by dingle on 16/12/7.
 */
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

const DEVICE_WIDTH = Dimensions.get('window').width
import DayView from './DayView'

export default class WeekView extends Component {

    state={
        age:10,
    };


    static defaultProps={
        days:[],
        onClickOneDay:()=>{console.log('WeekView -- 点击了日子')},
        isWeekCalendar:false,
        style:{}
    };




    render() {
        return (
            <View style={styles.weekViewStyle}>
                {this.loadSevenDayView()}
            </View>
        );
    }

    loadSevenDayView(){
        let dayViews = [];
        let days = this.props.days;


        for (let i = 0;i<7;i++){
            let day = days[i];
            // let isSelectedDay = false;

            // console.log('-- xxoo --',this.props.selectedDay)
            // if(day != null && this.props.selectedDay){
            //     isSelectedDay = day.format('YYYY-MM-DD') === this.props.selectedDay.format('YYYY-MM-DD')
            // }


            dayViews.push(<DayView key={i}
               dayMoment ={day}
               onClickOneDay = {this.props.onClickOneDay}
            />)
        }
        return dayViews
    }




}

const styles = StyleSheet.create({
    weekViewStyle:{
        flex:1,
        flexDirection:'row',
    },

});

