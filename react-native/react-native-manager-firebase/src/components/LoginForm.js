import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Button, Card, CardSection, Input, Spinner} from "./common";
import {emailChange, passwordChange, loginUser} from "../actions";
import {connect} from "react-redux";

const LoginForm = ({emailChange, passwordChange, auth, loginUser, navigation}) => {

    const onEmailChange = text => {
        emailChange(text)
    }

    const onPasswordChange = text => {
        passwordChange(text)
    }

    const onButtonPress = () => {
        loginUser(auth, () => {
            navigation.navigate('Employee')
        })
    }

    const renderError = () => {
        if (auth.error) {
            return (
                <View style={{backgroundColor: 'white'}}>
                    <Text style={styles.errorTextStyle}>{auth.error}</Text>
                </View>
            )
        }
    }

    const renderButton = () => {
        if (auth.loading) {
            return <Spinner/>
        }
        return <Button onPress={onButtonPress}>Login</Button>
    }

    return (
        <Card>
            <CardSection>
                <Input
                    label='Email'
                    placeholder='user@gmail.com'
                    onChangeText={onEmailChange}
                    value={auth.email}
                />
            </CardSection>

            <CardSection>
                <Input
                    secureTextEntry
                    label='Password'
                    placeholder='password'
                    value={auth.password}
                    onChangeText={onPasswordChange}
                />
            </CardSection>

            {renderError()}

            <CardSection>

                {renderButton()}
            </CardSection>
        </Card>
    )
}

const styles = StyleSheet.create({
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
})

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}


export default connect(mapStateToProps, {emailChange, passwordChange, loginUser})(LoginForm)

