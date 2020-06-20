import {  createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import SearchScreenWithContext from "./src/screens/SearchScreenWithContext";
import ResultShowScreenWithContext from "./src/screens/ResultShowScreenWithContext";

const navigator = createStackNavigator({
  Search: SearchScreenWithContext,
  ResultsShow: ResultShowScreenWithContext,

}, {
  initialRouteName: 'Search',
  defaultNavigationOptions: {
    title: 'Github Search'
  }
})

export default createAppContainer(navigator)
