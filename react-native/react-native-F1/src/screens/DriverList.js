import React, {useEffect, useState} from 'react'
import {Text, StyleSheet, FlatList, TouchableOpacity, ScrollView} from 'react-native'
import Spreadsheets from "../components/Spreadsheets";
import {connect} from "react-redux";
import {getDriverDetails, getDrivers} from "../store/actions/AppActions";
import Spinner from "../components/Spinner";
import SearchBar from "../components/SearchBar";


const DriverList = ({getDrivers, drivers, errorMessage, loading, getDriverDetails, navigation}) => {

    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        getDrivers()
    }, [])


    if (loading) {
        return <Spinner/>
    }

    const goToDetails = (id) => {
        getDriverDetails(id)
        navigation.navigate('Details')
    }


    const searchItems = (items, search) => {
        if (search.length === 0) {
            return items
        }

        return items.filter((item) => {
            return item.familyName.toLowerCase().indexOf(search.toLowerCase()) > -1 || item.givenName.toLowerCase().indexOf(search.toLowerCase()) > -1
        })
    }


    return (
        <ScrollView>
            {errorMessage ? <Text>{errorMessage}</Text> :
                <>
                    <SearchBar
                        term={searchValue}
                        onTermChange={setSearchValue}
                    />
                    <Text
                        style={styles.foundStyle}>found {drivers ? searchItems(drivers, searchValue).length : 0}</Text>
                    <FlatList
                        data={searchItems(drivers, searchValue)}
                        keyExtractor={({driverId}) => driverId}
                        renderItem={({item}) => {
                            return <Spreadsheets
                                driver={item}
                                onPressHandler={() => goToDetails(item.driverId)}
                            />
                        }}
                    />
                </>
            }
        </ScrollView>
    )
}

DriverList.navigationOptions = ({navigation}) => {
    return {
        headerRight: <TouchableOpacity onPress={() => navigation.navigate('Seasons')}>
            <Text style={styles.headerText}>Seasons</Text>
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    headerText: {
        fontWeight: 'bold',
        fontSize: 18,
        marginRight: 20
    },
    foundStyle: {
        marginLeft: 15
    }
})

const mapStateToProps = ({data}) => {
    const {drivers, errorMessage, loading} = data

    return {drivers, errorMessage, loading}
}


export default connect(mapStateToProps, {getDrivers, getDriverDetails})(DriverList)


