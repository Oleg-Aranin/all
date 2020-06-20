import React from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'

export default ({result}) => {

    return <View style={styles.container} >
        <Image style={styles.image} source={{uri: result.urls.small}} />
        <Text style={styles.title} >Title: {result.alt_description} </Text>
        <Text style={styles.name} >Author: {result.user.name} </Text>
    </View>
}

const styles = StyleSheet.create({
    image: {
        width: 115,
        height: 90,
        borderRadius: 4,
        marginBottom: 3,

    },
    name: {
        maxWidth: 100,
    },
    container: {
        marginLeft: 15,
        marginBottom: 10,

    },
    title: {
        maxWidth: 100,
        fontWeight: 'bold',
    }
})



