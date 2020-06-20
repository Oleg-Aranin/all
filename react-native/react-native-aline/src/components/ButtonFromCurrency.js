import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {AntDesign} from '@expo/vector-icons'


const ButtonFromCurrency = ({currency, title, onPressHandler}) => {

    if (!currency.title) return null
    return (
        <TouchableOpacity onPress={onPressHandler}>
            <View style={styles.backgroundStyle}>
                <View style={styles.currency}>
                    <Text style={styles.titleStyle}>{currency.title}</Text>
                    <Text style={styles.symbolStyle}>{currency.symbol}</Text>
                    <Text style={styles.valueStyle}>{currency.value}</Text>
                </View>
                <View style={styles.button}>
                    <Text style={styles.buttonTitle}>{title}</Text>
                </View>
                <AntDesign name='arrowright' style={styles.icon} size={35}/>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    backgroundStyle: {
        marginTop: 15,
        backgroundColor: '#595EB4',
        height: 110,
        borderRadius: 5,
        marginHorizontal: 15,
        flexDirection: 'row',
        marginBottom: 10,
        paddingHorizontal: 20,
        paddingTop: 5
    },
    titleStyle: {
        flex: 1,
        fontSize: 18,
    },
    symbolStyle: {
        flex: 1,
    },
    valueStyle: {
        flex: 1,
        marginTop: 5
    },
    currency: {
        flex: 5
    },
    button: {
        flex: 4,
        justifyContent: 'center',
    },
    buttonTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    icon: {
        flex: 1,
        alignSelf: 'center',

    }
})

export default ButtonFromCurrency
