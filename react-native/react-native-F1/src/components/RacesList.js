import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'

export default ({data, onPress}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <Text>Race Name: {data.raceName} round: {data.round}</Text>
                <Text>Season: {data.season} date: {data.date}</Text>
                <Text>Location: {data.Circuit.Location.country} , {data.Circuit.Location.locality}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        margin: 15,
        padding: 10
    }
})



