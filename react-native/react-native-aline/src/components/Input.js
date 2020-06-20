import React from 'react'
import {View, TextInput, StyleSheet} from 'react-native'

export default ({amount, onAmountChange, onAmountSubmit}) => {
    return <View style={styles.backgroundStyle}>
        <TextInput
            keyboardType='numeric'
            autoCapitalize='none'
            autoCorrect={false}
            placeholder='Введите сумму'
            style={styles.inputStyle}
            value={amount}
            onChangeText={onAmountChange}
            onEndEditing={onAmountSubmit}
        />
    </View>
}

const styles = StyleSheet.create({
    backgroundStyle: {
        marginTop: 15,
        backgroundColor: '#F0EEEE',
        height: 90,
        borderRadius: 5,
        marginHorizontal: 15,
        flexDirection: 'row',
        marginBottom: 10
    },
    inputStyle: {
        flex: 1,
        fontSize: 40,
        paddingLeft: 15
    }
})
