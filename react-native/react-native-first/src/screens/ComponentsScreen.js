import React from 'react'
import {Text, StyleSheet, View} from 'react-native'

export default props => {

const name = 'Oleg'
    const greeting = <Text style={{fontSize: 20}}>My name is {name}</Text>

 return(
<View>
 <Text style={styles.textStyle}>Getting started with React Native!</Text>
    <Text>{greeting}</Text>
</View>)
}
const styles = StyleSheet.create({
  textStyle: {
    fontSize: 45
  }
})
