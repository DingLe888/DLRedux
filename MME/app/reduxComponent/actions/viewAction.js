/**
 * Created by dingle on 2017/4/19.
 */

import {TAB_BAR_CHANGE,SELECTED_DAY_CHANGE} from './actionTypes'


export const tabAction = (value='calendar')=>{
    return {
        type:TAB_BAR_CHANGE,
        selectedTab:value
    }
};

export const selectedDayAction = (value='')=>{
    return {
        type:SELECTED_DAY_CHANGE,
        selectedDay:value,
    }
}