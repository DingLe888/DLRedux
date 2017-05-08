

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Dimensions,
    TouchableHighlight,
    LayoutAnimation,


} from 'react-native';
import moment from 'moment';
import MonthView from './MonthView'
import WeekView from './WeekView'


var {width,height} = Dimensions.get('window');

let headerViewHeight = 30;

var dataSourceCatch = [];

 class CalendarView extends Component {

     static defaultProps = {
        startDate:moment(), // 开始时间
         ds:new ListView.DataSource({rowHasChanged:(row1,row2) => row1!==row2}),
         clickOneDay:(day)=>{console.log('click +',day)}
     };

     constructor(props){
        super(props);

        var nowDay = moment();

         this.state = {
            nowDay:nowDay,
            dataSource:this.getDataSource(nowDay),
        };

        this.renderRow = this.renderRow.bind(this);
         // this.clickOneDay = this.clickOneDay.bind(this);


    }

    getDataSource(day=moment()){
         let year = day.year();
         let month = day.month() + 1;

         let dataSourceDate = moment(year + '-' + month + '-1','YYYY-MM-DD').subtract(2,'months');

        let dataSourceArr = [];

        for (let i = 0;i < 3;i++){
            let date = dataSourceDate.add(1,'month');
            let dateFormate = date.year() + "-" + (date.month() + 1);


            let hasCatch = false;

            dataSourceCatch.forEach((obj,idx,array)=>{
                let key = obj.key;
                let dataSource = obj.dataSource;
                if (dateFormate == key){
                    dataSourceArr.push({dataSource:dataSource,key:key});
                    hasCatch = true
                }
            });


            if (!hasCatch){
                let dataSource = this.getWeekDaysArray(moment(date));
                dataSourceArr.push({dataSource:dataSource,key:dateFormate})
            }
        }

        dataSourceCatch = dataSourceArr;



        return this.props.ds.cloneWithRows(dataSourceArr)

    }

     getWeekDaysArray(momentDays){
         console.log('计算一个月数据')
         let weeks = [];
         let weekDays = [];

         let year = momentDays.year();
         let month = momentDays.month() + 1;


         let weekDay = momentDays.day() == 0 ? 7 : momentDays.day(); // 周几
         let monthDaysCount = momentDays.daysInMonth(); // 共有多少天


         for (let i = 0;i < weekDay - 1;i++){
             weekDays.push(null)
         }

         for (let i = 1; i <= monthDaysCount;i++){
             let mo = moment(year + '-' + month + '-' + i,'YYYY-MM-DD');

             weekDays.push(mo);
             weekDay++;
             if (weekDay > 7) {
                 weekDay = 1;
                 weeks.push(weekDays);
                 weekDays = []
             }else if (i == monthDaysCount) {

                 let weeksCount = 7 - weekDays.length;
                 for (let i = 0; i < weeksCount; i++) {
                     weekDays.push(null)
                 }
                 weeks.push(weekDays)

             }
         }

         return weeks
     }

     componentDidMount() {
         this.scrollToCenter();
     }


    render() {

        return (
                <View style={styles.calendarViewStyle}>
                    <View style={styles.headerViewStyle}>
                        {this.loadHeaderView()}

                    </View>

                    <ListView
                        ref={(list)=>this._listView = list}
                        style={[styles.listViewStyle,]}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow}
                        contentContainerStyle={styles.contentContainerStyle}
                        pagingEnabled
                        bounces={false}
                        showsHorizontalScrollIndicator={false}
                        initialListSize = {1}
                        pageSize = {2}
                        onMomentumScrollEnd = {this.onScrollAnimationEnd.bind(this)}
                        showsVerticalScrollIndicator={false}
                    >

                    </ListView>

                </View>
        );
    }

     loadHeaderView(){
         var header = []
         var weeks = ['周一','周二','周三','周四','周五','周六','周日']
         for(let i=0;i<7;i++){
             header.push(
                 <View key={i} style={styles.headerTextViewStyle}>
                     <Text style={styles.headerTextStyle}>
                         {weeks[i]}
                     </Text>
                 </View>
             )
         }
         return header
     }


     onScrollAnimationEnd(e){
         var offSetMonth = e.nativeEvent.contentOffset.x/width

         if (offSetMonth != 1){
             var nowDay = moment(this.state.nowDay)

             switch (offSetMonth){
                 case 0:
                     nowDay.subtract(1,'months');
                    break;

                 case 2:
                     nowDay.add(1, 'months');
                     break;

                 default:
                     break
             }
             var ds = this.getDataSource(nowDay)
             this.setState({
                 ...this.state,
                 nowDay:nowDay,
                 dataSource:ds,
             });

             this.scrollToCenter()
         }
     }

     scrollToCenter(){
         var list = this._listView;
         list.scrollResponderScrollTo({x:width ,y:0,animated:false});
     }


    renderRow(rowData,section,row){

        var {dataSource,key} = rowData;


        return(
            <MonthView
                monthKey = {key}
                weekDataArray = {dataSource}
                onClickOneDay = {this.props.clickOneDay}
            />
        )
    }

     clickOneDay(day){
         // console.log('-- BKB --',day);


         // this.setState({
         //     selectedDay:day
         // })
     }






}

const styles = StyleSheet.create({
    calendarViewStyle:{
        flex:1,
        backgroundColor:'white',
        alignItems:'stretch',



    },
    listViewStyle:{
        flexDirection:'row',

        zIndex:100
    },
    contentContainerStyle:{
        flexDirection:'row',
    },
    headerViewStyle:{
        height:headerViewHeight,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'stretch',
        backgroundColor:'#e1e8f1',
    },
    headerTextStyle:{
        fontSize:10,
        color:'#666666',

    },
    headerTextViewStyle:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        margin:0.5,
        backgroundColor:'#fff'
    },
    detailViewStyle:{
        position:'absolute',
        zIndex:150,
        top:headerViewHeight,
        bottom:0,
        left:0,
        right:0,

    },

    weekViewStyle2:{
        position:'absolute',
        top:0,
        backgroundColor:'red',
        height:120,
        width:375,
    },

    detailListViewStyle:{
        flex:4,
        backgroundColor: 'white',
        justifyContent:'center',
        alignItems:'center',
    }

});


export default CalendarView