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
    TouchableOpacity
} from 'react-native';

import {
    calendar,
    calendar_selected,
    todoList,
    todoList_selected,
    edit,
    edit_selected,
    friend,
    friend_selected,
    cube,
    cube_selected
} from 'image'

import NavBar from 'publicComponent/navBar'

class Edit extends Component{

    constructor(props){
        super(props)

        this.state = {
            day:''
        }
    }
    render(){

        return (
            <View style={{flex:1}}>
                <NavBar
                    rightNavBarClick={()=>{}}
                    leftNavBarClick={()=>{}}
                    title={'添加事件'}
                />
                <Text style={{marginTop:5,fontSize:15,}}>
                    请输入事件：
                </Text>
                <TextInput
                    style={styles.inputStyle}
                    onChangeText={(text)=>{console.log('输入了：',text)}}
                    placeholder={'请输入事情'}

                />

                <TouchableOpacity style={styles.selectedTimeViewStyle}>

                    <Text>
                        请选择时间：
                    </Text>
                    <Text>
                        {this.state.day}
                    </Text>
                </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({
   inputStyle:{
       height:30,
        borderColor:'#999999',
       borderWidth:0.5,
       marginTop:10,
       marginHorizontal:10,
       borderRadius:3,
   },
    selectedTimeViewStyle:{
       marginTop:10,
        height:40,
        borderColor:'#999999',
        borderWidth:0.5,
        marginHorizontal:10,
        borderRadius:3,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',

    }

});

export default Edit
