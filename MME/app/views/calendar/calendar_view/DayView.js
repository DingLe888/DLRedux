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
    TouchableOpacity

} from 'react-native';

import moment from 'moment';
import calendarConverter from './calendar-converter'

import {connectStateOnly} from 'publicComponent/dlConnent'


class DayView extends Component {

    static converter = new calendarConverter;
    static today = moment().format('YYYY-MM-DD');

    static defaultProps={
        dayMoment:moment(),

        onClickOneDay:()=>{console.log('MonthView -- 点击了日子')},
    };

    constructor(props){
        super(props);

        // this._today = props.dayMoment.format('YYYY-MM-DD');
        // this._isSelected = false;
        if(this.props.dayMoment){
            this._today = this.props.dayMoment.format('YYYY-MM-DD');
            this._isSelected = false;
        }
    }


    getlunartext(){
        // var converter = new calendarConverter
        let solarText = this.props.dayMoment.format('YYYY-MM-DD');
        let date = new Date(solarText);
        let result = DayView.converter.solar2lunar(date);

        return result.lunarFestival.length > 0 ? result.lunarFestival : (result.solarFestival.length > 0 ? result.solarFestival : (result.solarTerms.length > 0 ? result.solarTerms : result.lunarDay))
    }

    // componentWillReceiveProps(newProps,newState) {
    //     // console.log(newProps,this.props,this.props != newProps);
    //     if (this._today == newProps.selectedDay || this._isSelected){
    //         this._isSelected = this._today == newProps.selectedDay;
    //
    //         console.log('return true');
    //         return true
    //     }
    //     return false;
    //     // return this.props.selectedDay != newProps
    // }

    shouldComponentUpdate(newProps,newState) {
        if (this._today == newProps.selectedDay || this._isSelected){
            this._isSelected = this._today == newProps.selectedDay;

            console.log('return true');
            return true
        }
        return false;
    }

    render() {
        let dayMoment = this.props.dayMoment;
        let bColor = '#fff';
        if(dayMoment){
            console.log('修改状态色值');
            bColor = dayMoment.isSame(DayView.today) ? '#f4faff' :((dayMoment.format('YYYY-MM-DD') == this.props.selectedDay) ? '#e1e8f1':'#fff');
        }

        return (

                <View style={[styles.container,{backgroundColor:bColor}]}>

                    {this.setSubviews()}

                </View>

        );
    }


    setSubviews(){


        if (this.props.dayMoment != null){

            var text = this.getlunartext();

            return (
                <TouchableOpacity
                    style={{flex:1}}
                    activeOpacity={0.5}
                    onPress={this.click.bind(this)}

                >
                <View style={{flex: 1}}>
                        <Text style={styles.textStyle1}>
                            {this.props.dayMoment.date()}
                        </Text>
                        <Text style={styles.textStyle2}>
                            {text}
                        </Text>


                    {this.loadMarkView()}
                </View>
                </TouchableOpacity>
            )
        }
    }

    click(){
        this.props.onClickOneDay(this.props.dayMoment)
    }

    loadMarkView(){ // 加载标签视图

        return (

            <View style={{flex:1,justifyContent:'flex-end'}}>
                <View style={styles.tagViewStyle}>

                </View>
            </View>
        )
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin:0.5,
    },

    calendarViewStyle:{
        marginTop:20
    },

    tagViewStyle:{

        backgroundColor:'#865',
        height:10,

    },

    textStyle1:{
        fontSize:10,
        color:'#333333',
        marginLeft:2,

    },
    textStyle2:{
        fontSize:11,
        color:'#666666',
        marginTop:4,
        marginLeft:2,
        height:11
    },


});

export default connectStateOnly((state)=>state.selectedDayReducer,DayView);

