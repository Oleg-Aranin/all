import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Spinner} from 'native-base';

export default () => {
    return (
        <View style={styles.spinnerStyle}>
            <Spinner color='blue'/>
        </View>
    )
}

const styles = StyleSheet.create({
    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

