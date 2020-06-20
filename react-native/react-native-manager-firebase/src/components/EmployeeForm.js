import React from 'react'
import {View, Text, StyleSheet, Picker} from 'react-native'
import {Card, CardSection, Input} from "./common";

export default ({name, phone, shift, employeeHandler}) => {
    return (
        <View>
            <CardSection>
                <Input
                    label='name'
                    placeholder='Jane'
                    value={name}
                    onChangeText={text => employeeHandler('name', text)}
                />
            </CardSection>
            <CardSection>
                <Input
                    label='Phone'
                    placeholder='555-555-555'
                    value={phone}
                    onChangeText={text => employeeHandler('phone', text)}
                />

            </CardSection>
            <CardSection style={styles.pickerWrap}>
                <Text style={styles.pickerText}>Shift</Text>
                <Picker
                    style={{flex: 1}}
                    selectedValue={shift}
                    onValueChange={day => employeeHandler('shift', day)}
                >
                    <Picker.Item label='Monday' value='Monday'/>
                    <Picker.Item label='Tuesday' value='Tuesday'/>
                    <Picker.Item label='Wednesday' value='Wednesday'/>
                    <Picker.Item label='Thursday' value='Thursday'/>
                    <Picker.Item label='Friday' value='Friday'/>
                    <Picker.Item label='Saturday' value='Saturday'/>
                    <Picker.Item label='Sunday' value='Sunday'/>
                </Picker>
            </CardSection>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        fontSize: 18,
        marginRight: 30
    },
    pickerText: {
        fontSize: 18,
        paddingLeft: 20
    },
    pickerWrap: {
        flexDirection: 'column',
        height: 75
    }
})
