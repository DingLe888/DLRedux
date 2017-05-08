/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// npm install

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Platform,   // 判断当前运行的系统
    Navigator
} from 'react-native';


/**-----导入外部的组件类------**/
import TabNavigator from 'react-native-tab-navigator';

import Calendar from 'views/calendar'
import TodoList from 'views/todoList'
import Edit from 'views/edit'
import Friend from 'views/friend'
import Cube from 'views/cube'

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

import TabBarView from './TabBarView'

class Main extends Component {

    render() {

        return (

            <Navigator
                initialRoute={{name:"",component:TabBarView}}
                configureScene={(router)=>{// 过渡动画
                        if(router.sceneConfig){
                            return router.sceneConfig
                        }else {
                            return Navigator.SceneConfigs.PushFromRight;
                        }
                    }}

                renderScene={(route,navigator)=>{
                           let Component = route.component;
                           return <Component {...route.passProps} navigator={navigator}/>;
                    }}
            />


        );
    }


}

const styles = StyleSheet.create({
    iconStyle: {
        width: Platform.OS === 'ios' ? 30 : 25,
        height: Platform.OS === 'ios' ? 30 : 25
    },

    selectedTitleStyle: {
        color: 'orange'
    }
});

// export default Main

// 输出组件类
export default Main
