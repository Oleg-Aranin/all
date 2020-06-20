import _ from 'lodash'
import React, {useEffect, useState} from 'react'
import {StyleSheet, Text, Picker} from 'react-native'
import {Entypo} from "@expo/vector-icons";
import EmployeeList from "./EmployeeList";
import {Card, CardSection, Input, Button} from './common'
import {connect} from "react-redux";
import Communications from 'react-native-communications'
import {employeeUpdate, employeeSave, employeeDelete} from "../actions";
import EmployeeForm from "./EmployeeForm";
import {Confirm} from './common/Confirm'


const EmployeeEdit = ({name, phone, shift, employeeUpdate, navigation, employeeSave, employeeDelete}) => {
const [visible, setVisible] = useState(false)
    const employee = navigation.getParam('employee')

    useEffect(() => {
       _.each(employee, (value, prop) => {
           employeeUpdate(prop, value)
       })

    }, [])


    const onButtonPress = () => {

        employeeSave({name, phone, shift, uid: employee.uid}, () => {
            navigation.pop()
        })
    }

    const onTextPress = () => {
        Communications.text(phone, `Your shift ${shift}`)
    }

    const onAccept = (employee) => {
        employeeDelete(employee, () => {
            setVisible(false)
            navigation.pop()
        })
    }

    const onDecline = () => {
        setVisible(false)
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
                    Save Changes
                </Button>
            </CardSection>

            <CardSection>
                <Button onPress={onTextPress} >
                    Text Schedule
                </Button>
            </CardSection>

            <CardSection>
                <Button  onPress={() => setVisible(true)}>
                    Fire Employee
                </Button>
            </CardSection>

            <Confirm
                visible={visible}
                onAccept={() => onAccept(employee)}
                onDecline={onDecline}
            >
                Are you sure you want to delete this?
            </Confirm>
        </Card>
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


const mapStateToProps = ({employeeForm}) => {
    const {name, phone, shift} = employeeForm

    return {name, phone, shift}
}


export default connect(mapStateToProps, {employeeUpdate, employeeSave, employeeDelete})(EmployeeEdit)
