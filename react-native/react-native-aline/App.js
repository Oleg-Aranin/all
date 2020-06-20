import React from 'react'
import {createAppContainer} from "react-navigation"
import {createStackNavigator} from 'react-navigation-stack'
import {Provider} from './src/context/ConverterContext'
import MainScree from "./src/screens/MainScree"
import SettingsScreen from "./src/screens/SettingsScreen";
import ToCurrency from "./src/screens/ToCurrency";
import FinishScreen from "./src/screens/FinishScreen";


const navigator = createStackNavigator({
  Main: MainScree,
  Settings: SettingsScreen,
  ToCurrency: ToCurrency,
  Finish: FinishScreen
}, {
  initialRouteName: 'Settings',
  defaultNavigationOptions: {
    title: 'Converter'
  }
})

const App = createAppContainer(navigator)

export default () => {
  return <Provider>
    <App/>
  </Provider>
}
