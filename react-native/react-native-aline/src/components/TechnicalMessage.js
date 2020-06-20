import React from 'react'
import {Text, StyleSheet, View} from 'react-native'

export default ({content}) => (
    <View style={styles.wrap}>
        <Text style={styles.loading}>{content}</Text>
    </View>
)
const styles = StyleSheet.create({
    wrap: {
        justifyContent: 'center',
        ...StyleSheet.absoluteFillObject
    },
    loading: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center'
    }
})
