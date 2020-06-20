import React from 'react'
import {View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity} from 'react-native'
import {connect} from "react-redux";
import Spinner from "../components/Spinner";
import RaceDetailsList from "../components/RaceDetailsList";
import {getDriverDetails} from "../store/actions/AppActions";

const RaceDetails = ({data, loading, navigation, getDriverDetails}) => {

    const onHandlerPress = (id) => {
        getDriverDetails(id)
        navigation.navigate('Details')
    }

    if (loading) {
        return <Spinner/>
    }

    return (
        <>
            <ScrollView>
                <View style={styles.containerHeader}>
                    <View>
                        <Text>{data.date} {data.raceName}, round: {data.round}, season: {data.season}</Text>
                    </View>

                    <View>
                        <Text>Country: {data.Circuit.Location.country} City: {data.Circuit.Location.locality}</Text>
                    </View>

                    <View>
                        <Text> Name: {data.Circuit.circuitName}</Text>
                    </View>
                </View>

                <FlatList
                    data={data.Results}
                    keyExtractor={item => item.Constructor.constructorId + item.Driver.driverId}
                    renderItem={({item}) => {
                        return <RaceDetailsList data={item} onPress={() => onHandlerPress(item.Driver.driverId)}/>
                    }}
                />
            </ScrollView>
        </>
    )
}

RaceDetails.navigationOptions = ({navigation}) => {
    return {
        headerRight: <TouchableOpacity onPress={() => navigation.navigate('Drivers')}>
            <Text style={styles.headerText}>Drivers</Text>
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    headerText: {
        fontWeight: 'bold',
        fontSize: 18,
        marginRight: 20
    },
    containerHeader: {
        marginTop: 15,
        alignSelf: 'center'
    }
})

const mapStateToProps = ({data}) => {
    return {
        data: data.detailsRace,
        loading: data.loading
    }
}

export default connect(mapStateToProps, {getDriverDetails})(RaceDetails)
