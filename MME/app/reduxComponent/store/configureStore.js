/**
 * Created by dingle on 2017/3/29.
 */
import {createStore,applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducer'

const loggerMiddleware = createLogger();
let middleware = [thunkMiddleware];
if(__DEV__){
    middleware = [...middleware,loggerMiddleware]
}

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

const configureStore = (initialState)=>{
    return createStoreWithMiddleware(rootReducer,initialState);
};

export default configureStore({});