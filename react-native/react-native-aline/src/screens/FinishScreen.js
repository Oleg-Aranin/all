import React, {useContext} from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'
import {Context} from "../context/ConverterContext";

export default ({navigation}) => {
    const {state} = useContext(Context)
    const {fromCurrencyData, toCurrencyData, amount} = state
    const value = toCurrencyData.value / fromCurrencyData.value

    return (
        <View style={styles.wrap}>
            <View style={styles.one}>
                <Text style={styles.size}> 1 </Text>
                <Text style={styles.size}> {fromCurrencyData.title} </Text>
                <Text style={styles.size}> = </Text>
                <Text style={styles.size}> {value} </Text>
                <Text style={styles.size}> {toCurrencyData.title} </Text>
            </View>
            <View style={styles.one}>
                <Text style={styles.size}> {amount} </Text>
                <Text style={styles.size}> {fromCurrencyData.title} </Text>
                <Text style={styles.size}> = </Text>
                <Text style={styles.size}> {value * amount} </Text>
                <Text style={styles.size}> {toCurrencyData.title} </Text>
            </View>
            <Button title='На главную' onPress={() => navigation.navigate('Main')}/>
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center'
    },
    one: {
        flexDirection: 'row',
        marginBottom: 50,
        alignSelf: 'center'
    },
    size: {
        fontSize: 18,
        fontWeight: 'bold',
    }
})
