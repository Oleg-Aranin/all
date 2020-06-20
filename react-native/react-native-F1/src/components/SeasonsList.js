import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

const SeasonsList = ({data}) => {
    return (
        <View style={styles.container}>
            <Text>{data.round}</Text>
            <Text>{data.raceName}</Text>
            <Text>{data.date}</Text>
            <Text>{data.time}</Text>
            <Text>{data.Circuit.Location.country}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        marginTop: 5,
        borderTopWidth: 1
    },
    text: {
        width: 10
    }
})


export default SeasonsList
