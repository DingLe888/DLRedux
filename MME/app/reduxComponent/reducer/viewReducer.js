/**
 * Created by dingle on 2017/4/19.
 */
import createReducer from './createReducer'

import {TAB_BAR_CHANGE,SELECTED_DAY_CHANGE} from '../actions/actionTypes'

export const selectedTabReducer = createReducer({
    selectedTab:'calendar',
},{
    [TAB_BAR_CHANGE](state,action){
        return {
            ...state,
            selectedTab:action.selectedTab,
        }
    }
});


export const selectedDayReducer = createReducer({
    selectedDay:''
},{
    [SELECTED_DAY_CHANGE](state,action){
        return {
            ...state,
            selectedDay:action.selectedDay,
        }
    }
});