import React from 'react'
import {StyleSheet, Text, Picker} from 'react-native'
import {Entypo} from "@expo/vector-icons";
import EmployeeList from "./EmployeeList";
import {Card, CardSection, Input, Button} from './common'
import {connect} from "react-redux";
import {employeeUpdate, employeeCreate} from "../actions";
import EmployeeForm from "./EmployeeForm";

const EmployeeCreate = ({name, phone, shift, employeeUpdate, navigation, employeeCreate}) => {

    const onButtonPress = () => {
        employeeCreate({name, phone, shift}, () => {
            navigation.pop()
        })
    }

    return (
        <Card>
            <EmployeeForm
                name={name}
                phone={phone}
                shift={shift}
                employeeHandler={employeeUpdate}
            />
            <CardSection>
                <Button onPress={onButtonPress} >
                    Create
                </Button>
            </CardSection>
        </Card>
    )
}

const styles = StyleSheet.create({
    content: {
        fontSize: 18,
        marginRight: 30
    }
})

EmployeeCreate.navigationOptions = ({navigation}) => {
    return {
        headerRight: <Text style={styles.content}>Create Employee</Text>
    }
}

const mapStateToProps = ({employeeForm}) => {
    const {name, phone, shift} = employeeForm

    return {name, phone, shift}
}


export default connect(mapStateToProps, {employeeUpdate, employeeCreate})(EmployeeCreate)
