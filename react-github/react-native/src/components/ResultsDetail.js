import React from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'

export default ({result}) => {
    return <View style={styles.container} >
        <Image style={styles.image} source={{uri: result.avatar_url}} />
        <Text style={styles.name} >{result.login}</Text>
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
        fontWeight: 'bold',

    },
    container: {
        marginLeft: 15,
        marginBottom: 10,

    }
})
