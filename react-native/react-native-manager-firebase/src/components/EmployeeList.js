import _ from 'lodash';
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import {employeesFetch} from '../actions';
import ListItem from './ListItem';
import {Entypo} from "@expo/vector-icons";

const EmployeeList = ({employeesFetch, employees}) => {

    useEffect(() => {
        employeesFetch()
    }, [])

    return (
        <FlatList
            data={employees}
            keyExtractor={({uid}) => uid}
            renderItem={({item}) => {
                return <ListItem employee={item}/>
            }}
        />
    );
}


EmployeeList.navigationOptions = ({navigation}) => {
    return {
        headerRight: <View style={styles.header}>
            <Text style={styles.content}>Employees</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Create')}>
                <Entypo name='plus' size={30} style={styles.icon}/>
            </TouchableOpacity>
        </View>,
        headerLeft: null,
        gesturesEnabled: false,
    }
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    content: {
        marginHorizontal: 20,
        fontSize: 18
    },
    icon: {
        marginHorizontal: 20
    }
})

const mapStateToProps = state => {
    const employees = _.map(state.employees, (val, uid) => {
        return {...val, uid};
    });

    return {employees};
};

export default connect(mapStateToProps, {employeesFetch})(EmployeeList);
