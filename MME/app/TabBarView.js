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

import {connectState} from 'publicComponent/dlConnent'

class TabBarView extends Component {
    constructor(props) {
        super(props);

        console.log('TabBarView',this.props)
    }

    render() {


        return (

            <TabNavigator>
                {/*--日历--*/}
                {this.renderTabBarItem('日历', calendar, calendar_selected, 'calendar', Calendar)}
                {/*--任务--*/}
                {this.renderTabBarItem('任务', todoList, todoList_selected, 'todoList', TodoList)}
                {/*--添加--*/}
                {this.renderTabBarItem('添加', edit, edit_selected, 'edit', Edit)}
                {/*--朋友--*/}
                {this.renderTabBarItem('朋友', friend, friend_selected, 'friend', Friend)}
                {/*--盒子--*/}
                {this.renderTabBarItem('盒子', cube, cube_selected, 'cube', Cube)}

            </TabNavigator>


        );
    }

    // 每一个TabBarItem
    renderTabBarItem(title, icon, selectedIcon, selectedTab, Component) {

        return (
            <TabNavigator.Item
                title={title}  // 传递变量,一定要加{}
                renderIcon={() => <Image source={icon} style={styles.iconStyle}/>} // 图标
                renderSelectedIcon={() =><Image source={selectedIcon} style={styles.iconStyle}/>}   // 选中的图标
                onPress={()=>{this.props.tabAction(selectedTab)}}
                selected={this.props.selectedTab === selectedTab}
                selectedTitleStyle={styles.selectedTitleStyle}
                badgeText={''}
            >
                <Component/>
            </TabNavigator.Item>
        )
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

// 输出组件类
export default connectState((state) => state.selectedTabReducer, (actions) => {
    return {tabAction: actions.tabAction}
}, TabBarView)
