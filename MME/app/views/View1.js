/**
 * Created by dingle on 2017/3/29.
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
    Image,
    TextInput
} from 'react-native';

import View2 from './View2'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import actions from 'reduxComponent/actions'
import {createSelector} from 'reselect'
import { ActionCreators } from 'redux-undo';

class View1 extends Component {

    componentDidMount() {
    }
    render() {
        return (
            <View style={styles.container}>
                    <Text onPress={()=>{

                        this.props.navigator.push({component:View2})
                    }}>
                        点击{this.props.name}
                    </Text>

                <Text onPress={this.btnclick2.bind(this)}>
                    点击2
                </Text>

                <TextInput style={styles.textInputStyle}
                           autoCapitalize={'none'}
                           autoFocus={true}
                           multiline={false}
                           placeholder={'hello world'}
                           selectTextOnFocus={true}
                />

                <Text onPress={this.btnclick3.bind(this)}>
                    点击3{this.props.bookName}
                </Text>

                <TextInput style={styles.textInputStyle}
                           autoCapitalize={'none'}
                           autoFocus={true}
                           multiline={false}
                           placeholder={'hello world'}
                           selectTextOnFocus={true}
                />

                <Text onPress={this.undo.bind(this)}>
                    回退
                </Text>

                <Text onPress={this.redo.bind(this)}>
                    返回
                </Text>

            </View>
        );
    }
    btnclick2(){
        console.log(this.props.bookName);
        this.props.action2('我擦')
    }

    btnclick3(){
        this.props.action4(1)
    }

    undo(){
        this.props.undo()
    }

    redo(){
        this.props.redo()
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fefefe',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    image:{
        width:200,
        height:200,
    },
    textInputStyle:{
        height:30,
        borderColor: 'gray',
        borderWidth: 1,
        fontSize:32,
        color:'red'
    }
});

const getTest3 = (state)=>state.test3;
const getTestUndo = (state)=>state.undoTest4.present;

const dd = createSelector([getTest3,getTestUndo],(test33,testUndo)=>{
        console.log('筛选state',test33,testUndo);

    return {...test33,...testUndo}
});

function mapStateToProps(state){
    console.log('筛选state之前 state：',state);

    return dd(state);
}

function mapDispatchToProps(dispatch) {
    console.log('筛选action',actions);

    const {action2, action4} = actions;
    let undo = ActionCreators.undo;
    let redo = ActionCreators.redo;
    const cc = bindActionCreators({action2,action4,undo,redo},dispatch);

    return cc
}
export default connect(mapStateToProps,mapDispatchToProps)(View1);