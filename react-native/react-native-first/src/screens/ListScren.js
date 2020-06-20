import React from 'react'
import {Text, StyleSheet, View, FlatList} from 'react-native'

export default props => {
    const friends = [
        {name: 'fedy #1', age: 20},
        {name: 'vova #2', age: 25},
        {name: 'oleg #3', age: 30},
        {name: 'oleg #4', age: 35},
        {name: 'oleg #5', age: 40},
        {name: 'oleg #6', age: 45},
        {name: 'oleg #7', age: 50},
        {name: 'oleg #8', age: 55},
        {name: 'oleg #9', age: 60}
    ]

  return (
      <FlatList

          keyExtractor={friend => friend.name}
          data={friends}
          renderItem={({item}) => <Text style={styles.textStyle} >{item.name} - Age {item.age}</Text>}
      />
  )
}

const styles = StyleSheet.create({
 textStyle: {
     marginVertical: 20,
     borderWidth: 0.5,
     borderColor: '#d6d7da'
 }
})
