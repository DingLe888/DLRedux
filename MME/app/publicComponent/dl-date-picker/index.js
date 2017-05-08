import React ,{Component,PropTypes}from 'react';

import {
    View,
    StyleSheet,
    Text,
    Image,
    Modal,
    TouchableOpacity,
    Picker,
    PanResponder
} from 'react-native';
var moment = require('moment');

import DateTimePicker from './dateTimePicker'
import TimePicker from './timePicker'
import HalfDayPicker from './halfDayPicker'
var moment = require('moment');
var datePickerHeight = 30 * 7;
import {padStart} from './numberTool'

class DLDatePick extends Component{

    static propTypes = {
        // timeMode => time: HH:mm  datetime: YYYY-MM-DD HH:mm  date: YYYY-MM-DD  day: YYYY-MM-DD (0 上午/1 下午)
        timeMode:PropTypes.oneOf(['time','datetime','date','day']), // 组件的模式
        lastTime:PropTypes.string, // 最后可选时间
        startTime:PropTypes.string, // 最早可选时间
        selectedTime:PropTypes.string, // 当前选中时间
        onCancel:PropTypes.func, // 取消按钮回调方法
        onSure:PropTypes.func, // 确定按钮回调方法
        returnValueFormat:PropTypes.string, // 返回时间字符串样式

        // 每天可用的时间区间 0~23点
        workStartTime:PropTypes.number, // 小时数的区间最小值
        workEndTime:PropTypes.number, // 小时数的区间最大值

        // 多少分钟间隔
        period:PropTypes.number, // 分钟数的间隔段位 比如15分钟一段 分钟数列就显示（0，15，30，45）
    };

    static defaultProps = {

        timeMode:'datetime',
        returnValueFormat:'YYYY-MM-DD HH:mm',
        selectedTime:moment().utcOffset(8).format('YYYY-MM-DD HH:mm'),
        lastTime:moment().add(10, 'y').utcOffset(8).format('YYYY-MM-DD HH:mm'),
        startTime:moment().subtract(10, 'y').utcOffset(8).format('YYYY-MM-DD HH:mm'),
        // 每天可用的时间区间 0~23点
        workStartTime:8,
        workEndTime:18,

        // 多少分钟间隔
        period:30,
    };

    constructor(props){
        super(props);

        this.state = {
            modalVisible:false,
        };
        this._nowSelectedTime = this.props.selectedTime;

        if(__DEV__){
            console.log('接收到外部数据 start last',this.props.startTime,this.props.lastTime);
        }
    }


    _nowSelectedTime='';
    componentWillReceiveProps(newProps) {
        this._nowSelectedTime = newProps.selectedTime
    }

    render(){
        this.setDefaultSelectedData();
        return (
            <Modal
                animationType={"slide"}
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {}}
            >
                <View style={styles.container}>

                    <TouchableOpacity style={{flex:1}}
                                      onPress={this._dismiss.bind(this)}
                    />
                    <View style={{backgroundColor:'#453445',justifyContent:'flex-end'}}>

                        <View style={styles.toolBarStyle}>
                            <TouchableOpacity style={styles.btn} onPress={this._dismiss.bind(this)}>
                                <Text style={styles.touchBarStyle}>取消</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btn} onPress={this._handleSubmit.bind(this)}>
                                <Text style={styles.touchBarStyle}>确认</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.contentView}>
                            <View style={styles.promptViewStyle}/>
                            {this.loadPickerView()}
                        </View>
                    </View>


                </View>
            </Modal>
        )
    }

    // 每次刷新更新  以及每次子组件有返回值时更新
    setDefaultSelectedData(){

        // 记录选中值
        let selectedDate = moment(this._nowSelectedTime);
        let hour = selectedDate.get('hour');
        let minute = selectedDate.get('minute');

        let minuteNum = Math.floor(minute / this.props.period) * this.props.period;
        var hourNum = hour > this.props.workEndTime ? this.props.workEndTime : hour;
        hourNum = hourNum < this.props.workStartTime ? this.props.workStartTime : hourNum;

        this._selectedDate = selectedDate.format('YYYY-MM-DD');
        this._selectedTime = padStart(hourNum,2,'0') + ':' + padStart(minuteNum,2,'0');


        this._selectedHalfDay = selectedDate.get('hour') > 12 ? 1 : 0;
    }


    show(){
        this.setState({
            modalVisible:true
        })
    }

    _dismiss(){ // 点击取消或者空白区域处理
        this.setState({
            modalVisible:false
        });
    }

    _handleSubmit(){ // 点击确定处理

        let selectedTime = moment(this._selectedDate + ' ' + this._selectedTime);
        let selectedStr = selectedTime.format(this.props.returnValueFormat);
       this.props.onSure(selectedStr,this._selectedHalfDay);

        this.setState({
            modalVisible:false
        });
    }

    loadPickerView(){
        switch (this.props.timeMode) {
            case 'time':
                return [this.loadTimePicker()];
                break;
            case 'datetime':
                return [this.loadDateTimePicker(),this.loadTimePicker()];
                break;
            case 'date':
                return [this.loadDateTimePicker()];
                break;
            case 'day':
                return [this.loadDateTimePicker(),this.loadHalfDayPicker()];
                break;
        }
    }

    loadHalfDayPicker(){
        return (
            <HalfDayPicker
                key={'HalfDayPicker'}
                selectedTime={this._nowSelectedTime}
                onTimeChange={this._onHalfDayPickerChange.bind(this)}
                itemHeight={datePickerHeight / 7}
            />
        )
    }

    _onHalfDayPickerChange(value){
        this._selectedHalfDay = value;
        this._onChange()
    }

    loadTimePicker(){
        console.log('加载 时分picker',this._nowSelectedTime);

        return (
            <TimePicker
                key={'TimePicker'}

                selectedTime={this._nowSelectedTime}
                workStartTime={this.props.workStartTime}
                workEndTime={this.props.workEndTime}
                period={this.props.period}
                onTimeChange={this._onTimePickerChange.bind(this)}
                itemHeight={datePickerHeight / 7}
            />
        )
    }
    _onTimePickerChange(value){
        this._selectedTime = value;
        this._onChange()
    }

    // 年月日
    loadDateTimePicker(){
        return (
            <DateTimePicker
                key={'DateTimePicker'}

                lastTime={this.props.lastTime}
                startTime={this.props.startTime}
                selectedTime={this._nowSelectedTime}
                onTimeChange={this._onDateTimePickerChange.bind(this)}
                itemHeight={datePickerHeight / 7}
            />
        )
    }

    _onDateTimePickerChange(value){
        this._selectedDate = value;
        this._onChange();
    }

    _onChange(){
        var selectedStr = this._selectedDate + ' ' + this._selectedTime;

        if(__DEV__){
            console.log('选中了时间',selectedStr,this.props.startTime,this.props.lastTime);
        }

        var selectedTime = moment(selectedStr);

        if(__DEV__){
            console.log('是否低于开始时间 是否高于最后时间',selectedTime.isBefore(this.props.startTime),selectedTime.isAfter(this.props.lastTime));
        }


        if(this.props.timeMode == 'datetime' || this.props.timeMode == 'date' || this.props.timeMode == 'day'){

            if (selectedTime.isBefore(this.props.startTime)){
                    this._nowSelectedTime=this.props.startTime;
                    this.setState({
                        modalVisible:true,
                    });
            }

            if(selectedTime.isAfter(this.props.lastTime)){
                    this._nowSelectedTime=this.props.lastTime;
                this.setState({
                    modalVisible:true,
                });
            }
        }

    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'rgba(9, 9, 9, 0.5)',
        justifyContent:'flex-end',

    },
    contentView:{
        height:datePickerHeight,
        backgroundColor:'#fff',
        flexDirection:'row',
        alignItems:'stretch',
        paddingHorizontal:12,
        justifyContent:'flex-end',
    },
    toolBarStyle:{
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#507297',
        flexDirection: 'row',
        height:44,
        paddingHorizontal:8,
    },
    touchBarStyle: {
        color: '#FFF',
        fontSize: 16
    },
    promptViewStyle:{
        position:'absolute',
        left:0,
        right:0,
        bottom:(datePickerHeight / 7) * 3,
        top:(datePickerHeight / 7) * 3,

        borderColor:'rgba(150, 150, 150, 0.4)',
        borderTopWidth:0.5,
        borderBottomWidth:0.5
    }


});

export default DLDatePick