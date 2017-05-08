/**
 * Created by dingle on 2017/4/19.
 */


import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import actions from 'reduxComponent/actions'

import {createSelector} from 'reselect'
// import {ActionCreators} from 'redux-undo';
// let undo = ActionCreators.undo;
// let redo = ActionCreators.redo;

export const connectSelector = (getStates,getStateFun,actionFun,component)=>{


    let selector = createSelector(getStates,getStateFun);

    let mapDispatchToProps = (dispatch)=>{
        return bindActionCreators(actionFun(actions),dispatch);
    };

    let connectCom = connect(selector,mapDispatchToProps)(component);
    // console.log('获得了 state',connectCom);
    return connectCom;
};


export const connectState = (getStates,actionFun,component)=>{


    let mapDispatchToProps = (dispatch)=>{
        return bindActionCreators(actionFun(actions),dispatch);
    };

    let connectCom = connect(getStates,mapDispatchToProps)(component);
    // console.log('获得了 state',connectCom);

    return connectCom;
};


export const connectStateOnly = (getStates,component)=> {
    let connectCom = connect(getStates)(component);
    // console.log('获得了 state',connectCom);

    return connectCom;
};
