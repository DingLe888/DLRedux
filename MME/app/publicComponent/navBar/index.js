/**
 * Created by dingle on 2017/5/6.
 */

import React, { Component,PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Platform,
    TouchableOpacity
} from 'react-native';

import {navBarBack,addBtn} from 'image'

class NavBar extends Component{

    static defaultProps={

        leftNavBarImage:navBarBack,
        rightNavBarImage:addBtn,
    };

    static propTypes = {
        leftNavBarClick:PropTypes.func,
        rightNavBarClick:PropTypes.func,
        title:PropTypes.string,
    };
    render(){
        return (
            <View style={[styles.container,this.props.style]}>
                {this.getLeftNavBar()}
                {this.getTitleView()}
                {this.getRightNavBar()}
            </View>
        )
    }

    getLeftNavBar(){
        if (this.props.leftNavBarClick){
            return  (
                <TouchableOpacity style={styles.barBtnStyle}
                                  onPress={this.props.leftNavBarClick}
                >
                    <Image source={this.props.leftNavBarImage}/>
                </TouchableOpacity>
            )
        }else {
            return (
                <View/>
            )
        }
    }

    getRightNavBar(){
        if (this.props.rightNavBarClick){
            return (
                <TouchableOpacity style={styles.barBtnStyle}
                                  onPress={this.props.rightNavBarClick}>
                    <Image source={this.props.rightNavBarImage}/>
                </TouchableOpacity>
            )
        }else {
            return (
                <View/>
            )
        }
    }

    getTitleView(){
        if (this.props.title){
            return (
                <View style={styles.titleViewStyle}>
                    <Text style={styles.titleStyle}>
                        {this.props.title}
                    </Text>
                </View>

            )
        }
    }
}

const styles = StyleSheet.create({
   container:{
       height:Platform.OS == 'ios'?64:44,
       backgroundColor:'#2ea3f2',
       alignSelf:'stretch',
       flexDirection:'row',
       justifyContent:'space-between'
   },
    barBtnStyle:{
       alignItems:'center',
        justifyContent:'center',
        width:44,
        height:44,
        alignSelf:'flex-end',
    },
    titleStyle:{
       color:"#fff",
        fontSize:16,
    },
    titleViewStyle:{
        height:44,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'flex-end',
    }
});

export default NavBar
