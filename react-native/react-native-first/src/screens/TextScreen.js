import React, {useState} from 'react';
import { Text, StyleSheet, Button, View, TextInput} from 'react-native';

export default () => {
 const [password, setPassword] = useState('')

    return <View>
        <Text>Enter Password:</Text>
        <TextInput
            style={styles.input}
            autoCapitalize='none'
            autoCorrect={false}
            value={password}
            onChangeText={newValue => setPassword(newValue)}
        />

        {password.length < 5 ? <Text>Password must be longer then 5 characters</Text> : null}
    </View>
}


const styles = StyleSheet.create({
    input: {
        margin: 15,
        borderColor: 'black',
        borderWidth: 1
    }
})
