import React from 'react'
import {View, Text, StyleSheet, FlatList, Linking } from 'react-native'

export default ({repos}) => {
return (
    <FlatList
      data={repos}
      keyExtractor={repos => repos.archive_url}
      renderItem={({item}) => {
    return (
          <View style={styles.container}>
          <Text
              style={styles.name}
              onPress={() => Linking.openURL(item.html_url)}
          > {item.name}</Text>
          </View>
      )
    }}
    />
)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 35,

        marginTop: 5,
    },
    name: {
        color: 'blue',
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: 16
    }
})
