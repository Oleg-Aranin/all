import React from 'react'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from "redux";
import ReduxThunk from 'redux-thunk'
import reducers from './store/reducers/rootReducer'
import Drivers from "./Navigation";


export default () => {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))
    return (
        <Provider store={store}>
            <Drivers/>
        </Provider>
    )
}
