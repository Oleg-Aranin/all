import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native'

const SettingsScreen = () => {
    return (
        <View style={styles.wrap}>
            <View style={styles.section}>
                <Text>язык</Text>
            </View>
            <View style={styles.section}>
                <Text>тема</Text>
            </View>
            <View style={styles.section}>
                <Text>любимая валюта</Text>
            </View>
            <View style={styles.section}>
                <Text>Settings</Text>
            </View>
            <Button title='Сбросить все настройки'/>
        </View>
    )
}

SettingsScreen.navigationOptions = ({navigation}) => {
    return {
        headerRight: <TouchableOpacity onPress={() => navigation.navigate('Main')}>
            <Text style={styles.save}>Save</Text>
        </TouchableOpacity>
    }
}


const styles = StyleSheet.create({
    wrap: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'space-around',
        alignItems: 'center',
        alignContent: 'center',
    },
    save: {
        marginRight: 15,
        fontSize: 18,
        fontWeight: 'bold'
    },
    section: {
        height: 50,
        width: 200,
        backgroundColor: '#8F4B4B',
    }
})

export default SettingsScreen
