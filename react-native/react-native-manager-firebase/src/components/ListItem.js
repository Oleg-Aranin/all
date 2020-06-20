import React from 'react'
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native'
import {CardSection} from "./common";
import { withNavigation } from 'react-navigation';

const ListItem = ({employee, navigation}) => {

    const onRowPress = () => {
        navigation.navigate('Edit', {employee})
    }

    return (
        <TouchableWithoutFeedback onPress={onRowPress} >
            <View>
        <CardSection>
            <Text style={styles.titleStyle} >{employee.name}</Text>
        </CardSection>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
    }
})

export default withNavigation(ListItem)
