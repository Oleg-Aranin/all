import React from 'react'
import {  createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import {State} from "./src/context/context/State";
import SearchScreen from "./src/screens/PhotosScreen";
import ResultShowScreen from "./src/screens/ResultsShowScreen";

const navigator = createStackNavigator({
  Search: SearchScreen,
  ResultsShow: ResultShowScreen,

}, {
  initialRouteName: 'Search',
  defaultNavigationOptions: {
    title: 'Github Search'
  }
})

 const App = createAppContainer(navigator)



export default () => {
  return <State>
    <App />
  </State>
}
