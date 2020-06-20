import React, {useReducer} from 'react';
import { Text, StyleSheet, View } from 'react-native';
import ColorCounter from "../components/ColorCounter";

const COLOR_INCREMENT = 15

const CHANGE_RED = 'CHANGE_RED'
const CHANGE_GREEN = 'CHANGE_GREEN'
const CHANGE_BLUE = 'CHANGE_BLUE'


const reducer = (state, action) => {
  switch (action.type) {
      case CHANGE_RED:
          return state.red + action.payload > 255 || state.red + action.payload < 0
      ? state
      : {...state, red: state.red + action.payload}
      case CHANGE_GREEN:
          return state.green + action.payload > 255 || state.green + action.payload < 0
              ? state
              : {...state, green: state.green + action.payload}
      case CHANGE_BLUE:
          return state.blue + action.payload > 255 || state.blue + action.payload < 0
              ? state
              : {...state, blue: state.blue + action.payload}
      default:
          return state
  }
}



export default () => {

const [state, dispatch] = useReducer(reducer, {red: 0, green: 0, blue: 0})

    return <View>
        <ColorCounter
            color='Red'
            onIncrease={() => dispatch({type: CHANGE_RED, payload: COLOR_INCREMENT}) }
            onDecrease={() => dispatch({type: CHANGE_RED, payload: -1 * COLOR_INCREMENT})}
        />
        <ColorCounter
            color='Blue'
            onIncrease={() => dispatch({type: CHANGE_BLUE, payload: COLOR_INCREMENT}) }
            onDecrease={() => dispatch({type: CHANGE_BLUE, payload: -1 * COLOR_INCREMENT})}
        />
        <ColorCounter
            color='Green'
            onIncrease={() => dispatch({type: CHANGE_GREEN, payload: COLOR_INCREMENT}) }
            onDecrease={() => dispatch({type: CHANGE_GREEN, payload: -1 * COLOR_INCREMENT})}
        />

        <View style={{ height: 150, width: 150, backgroundColor: `rgb(${state.red}, ${state.green}, ${state.blue})`}}/>
    </View>

}


const styles = StyleSheet.create({})
