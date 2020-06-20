import React, {useEffect} from 'react'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from "redux";
import ReduxThunk from 'redux-thunk'
import reducers from './reducers'
import firebase from "firebase";
import App from "./Navigation";


export default () => {

    useEffect(() => {
        firebase.initializeApp({
            apiKey: "AIzaSyCwWetVxVz8VTRv0BUt1tI1vDU5D6nmWZQ",
            authDomain: "auth-493d6.firebaseapp.com",
            databaseURL: "https://auth-493d6.firebaseio.com",
            projectId: "auth-493d6",
            storageBucket: "auth-493d6.appspot.com",
            messagingSenderId: "192893453331",
            appId: "1:192893453331:web:92ce16a8f4991f0ef5abe6"
        })
    })

    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))

    return (
        <Provider store={store}>
            <App/>
        </Provider>)
}

