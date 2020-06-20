import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'

export default ({data, onPress}) => {
    return (
        <View style={styles.container}>
            <View>
                <Text>Constructor: {data.Constructor.name} nationality: {data.Constructor.nationality}</Text>
            </View>
            <View style={styles.nameStyle}>
                <Text>Driver: </Text>
                <TouchableOpacity onPress={onPress}>
                    <Text style={styles.driverStyle}>{data.Driver.givenName} {data.Driver.familyName} </Text>
                </TouchableOpacity>
                <Text> nationality: {data.Driver.nationality} </Text>
            </View>
            <View>
                <Text>grid: {data.grid} laps: {data.laps} number: {data.number}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        borderBottomWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    driverStyle: {
        color: 'blue',
    },
    nameStyle: {
        flexDirection: 'row',
    }
})
