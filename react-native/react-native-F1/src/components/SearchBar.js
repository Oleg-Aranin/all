import React from 'react'
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native'
import {Feather, AntDesign} from '@expo/vector-icons'

export default ({term, onTermChange, omTermSubmit}) => {
    return <View style={styles.backgroundStyle}>
        <Feather name='search' style={styles.iconStyle}/>
        <TextInput
            autoCapitalize='none'
            autoCorrect={false}
            placeholder='Search'
            style={styles.inputStyle}
            value={term}
            onChangeText={onTermChange}
            onEndEditing={omTermSubmit}
        />
        <TouchableOpacity style={styles.closeStyle} onPress={() => onTermChange('')}>
            <AntDesign name='close' style={styles.closeIconStyle}/>
        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
    backgroundStyle: {
        marginTop: 15,
        backgroundColor: '#F0EEEE',
        height: 50,
        borderRadius: 5,
        marginHorizontal: 15,
        flexDirection: 'row',
        marginBottom: 10
    },
    inputStyle: {
        flex: 1,
        fontSize: 18
    },
    iconStyle: {
        fontSize: 35,
        alignSelf: 'center',
        marginHorizontal: 15
    },
    closeStyle: {
        fontSize: 25,
        alignSelf: 'center',
        marginHorizontal: 15
    },
    closeIconStyle: {
        fontSize: 25
    }
})
