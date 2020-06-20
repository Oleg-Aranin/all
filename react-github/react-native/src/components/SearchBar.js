import React, {useState, useContext, useEffect} from 'react'
import {View, TextInput, StyleSheet} from 'react-native'
import {Feather} from '@expo/vector-icons'
import {GithubContext} from "../context/context/githubContext";

export default () => {

    const [value, setValue] = useState('')
    const github = useContext(GithubContext)

    useEffect(() => {
        github.search('react')
    }, [])

    const omTermSubmit = () => {
        github.clearUsers()

        if (value.trim()) {
            github.search(value.trim())
        }
    }

    return <View style={styles.backgroundStyle}>
        <Feather name='search' style={styles.iconStyle}/>
        <TextInput
            autoCapitalize='none'
            autoCorrect={false}
            placeholder='Enter user nickname...'
            style={styles.inputStyle}
            value={value}
            onChangeText={newValue => setValue(newValue)}
            onEndEditing={omTermSubmit}
        />
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
    }
})
