import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

export default () => {
    return (
        <View style={styles.container}>
            <Text>Round</Text>
            <Text>Race Name</Text>
            <Text>Date</Text>
            <Text>Time</Text>
            <Text>Country</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    text: {
        width: 10
    }
})
