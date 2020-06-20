import React, {useReducer} from 'react';
import { Text, StyleSheet, Button, View } from 'react-native';

const INCREMENT = 'INCREMENT'
const DECREMENT = 'DECREMENT'

const reducer = (state, action) => {
    switch (action.type) {
        case INCREMENT:
            return {...state, count: state.count + action.payload}
        case DECREMENT:
            return {...state, count: state.count + action.payload}
        default:
            return state
    }
}

export default () => {
    const [state, dispatch] = useReducer(reducer, {count: 0})

    return <View>
        <Button title='Increase'
                onPress={() => dispatch({type: INCREMENT, payload: 1})}/>
        <Button title='Decrease'
                onPress={() => dispatch({type: DECREMENT, payload: -1})}/>
        <Text>Current Count: {state.count}</Text>
    </View>
}

const styles = StyleSheet.create({

})
