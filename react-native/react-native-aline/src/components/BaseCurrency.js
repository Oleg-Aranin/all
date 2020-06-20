import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

export default ({data, amount}) => {
    return (
        <View style={styles.wrap}>
            <View style={styles.currency}>
                <Text style={styles.header}>Базовая валюта: </Text>
                <Text style={styles.title}>{data.title}</Text>
                <Text style={styles.symbol}>{data.symbol}</Text>
            </View>
            <View style={styles.amount}>
                <Text style={styles.header}>Количество: </Text>
                <Text style={styles.title}>{amount}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {
        marginTop: 15,
        backgroundColor: '#AABF3F',
        height: 80,
        borderRadius: 5,
        marginHorizontal: 15,
        justifyContent: 'space-around',
        marginBottom: 10,
        paddingHorizontal: 20,

    },
    currency: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    header: {
        flex: 4,
        fontSize: 16,
        fontWeight: 'bold'
    },
    title: {
        flex: 2,
        fontSize: 18,
        fontWeight: 'bold'
    },
    symbol: {
        flex: 4
    },
    amount: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})
