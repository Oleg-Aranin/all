import {combineReducers} from 'redux'
import {appReducer} from "./appReduser";

export default combineReducers({
    app: appReducer
})
