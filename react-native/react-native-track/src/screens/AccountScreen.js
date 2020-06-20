import React, {useContext} from 'react'
import {Button, Text} from 'react-native-elements'
import {SafeAreaView} from "react-navigation";
import Spacer from "../components/Spacer";
import {Context} from "../context/AuthContext";
import {FontAwesome} from "@expo/vector-icons";

const AccountScreen = () => {
    const {signout} = useContext(Context)

    return (
        <SafeAreaView forceInset={{top: 'always'}}>
            <Text h3>Account Screen</Text>
            <Spacer>
                <Button
                    onPress={signout}
                    title='Sign Out'
                />
            </Spacer>
        </SafeAreaView>
    )
}

AccountScreen.navigationOptions = {
    title: 'Account',
    tabBarIcon: <FontAwesome name='gear' size={20}/>
}

export default AccountScreen
