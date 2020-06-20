import React from 'react'
import {  createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import PhotosScreen from "./src/screens/PhotosScreen";
import ResultShowScreen from "./src/screens/ResultsShowScreen";


import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from "./src/store/reducers/rootReducer";



const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        }) : compose;

const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)



const navigator = createStackNavigator({
    Photos: PhotosScreen,
    ResultsShow: ResultShowScreen,
}, {
    initialRouteName: 'Photos',
    defaultNavigationOptions: {
        title: 'Unsplash'
    }
})

const App = createAppContainer(navigator)



export default () =>{
       return (
           <Provider store={store}>
               <App/>
           </Provider>
       )
}

