import React from 'react'
import { Text, StyleSheet} from 'react-native'

export default () => <Text style={styles.loading} >Loading...</Text>

const styles = StyleSheet.create({
    loading: {
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 20
    }
})
