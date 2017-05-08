/**
 * Created by dingle on 2017/4/5.
 */

export const padStart = (num=0,len=1, placeholder=' ')=>{
    let numStr = num + '';
    if (numStr.length < len){
        let dif = len - numStr.length;
        var endStr = '';

        for (var i = 0;i<dif;i++){
            endStr += placeholder;
        }
        endStr += numStr;
        return endStr;
    }else {
        return numStr
    }
};

