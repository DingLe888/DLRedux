/**
 * Created by dingle on 2017/4/19.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    ListView
} from 'react-native';

import CalendarView from './calendar_view/CalendarView'
import {connectState} from 'publicComponent/dlConnent'

class Calendar extends Component{

    constructor(props){
        super(props);

        console.log('nmnmnm',this.props);

    }

    render(){
        return (
            <View style={{flex:1}}>
                <View style={{height:280,marginTop:20}}>
                    <CalendarView
                        clickOneDay={this._clickOneDay.bind(this)}
                    />
                </View>
                <View style={{flex:1}}>
                    
                </View>
            </View>
        )
    }

    _clickOneDay(day){
        // console.log('点击了',day.format('YYYY-MM-DD'))
        let selectedDayStr = day.format('YYYY-MM-DD');
        this.props.selectedDayAction(selectedDayStr);
    }
}


export default connectState((state)=>state.selectedDayReducer,(action)=>{return {selectedDayAction:action.selectedDayAction}},Calendar);
