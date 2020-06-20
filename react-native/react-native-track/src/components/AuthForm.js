import React, {useState} from 'react'
import {Input, Text, Button} from 'react-native-elements'
import {StyleSheet} from 'react-native'
import Spacer from "./Spacer";

export default ({headerText, errorMessage, onSubmit, submitButtonText}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <>
            <Spacer>
                <Text h3>{headerText}</Text>
            </Spacer>
            <Input
                label='Email'
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <Spacer/>
            <Input
                label='Password'
                vlue={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
            />

            {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

            <Spacer>
                <Button
                    title={submitButtonText}
                    onPress={() => onSubmit({email, password})}
                />
            </Spacer>
        </>
    )
}

const styles = StyleSheet.create({
    errorMessage: {
        fontSize: 16,
        color: 'red',
        alignSelf: 'center',
        marginTop: 10
    },
})
