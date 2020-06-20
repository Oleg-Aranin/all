import React from 'react'
import {View, Text, StyleSheet, Linking, TouchableOpacity, FlatList, ScrollView} from 'react-native'
import {connect} from "react-redux";
import Spinner from "../components/Spinner";
import RacesList from "../components/RacesList";
import {onPressFormHandler} from "../store/actions/AppActions";

const DriverDetails = ({details, loading, errorMessage, races, navigation, onPressFormHandler}) => {

    const onPress = (season, round) => {
        onPressFormHandler(season, round)
        navigation.navigate('RaceDetails')
    }

    if (loading) {
        return <Spinner/>
    }

    return (
        <View style={styles.container}>
            {errorMessage ? <Text>{errorMessage}</Text> :
                <>
                    <ScrollView>
                        <View style={styles.containerData}>
                            <View style={styles.containerName}>
                                <Text>Name: </Text>
                                <Text style={styles.name}>{details.givenName} {details.familyName} </Text>
                            </View>
                            <Text>Nationality: {details.nationality}</Text>
                            <Text>Date of birth: {details.dateOfBirth}</Text>

                            <TouchableOpacity onPress={() => {
                                Linking.openURL(details.url)
                            }}>
                                <Text style={styles.link}> Open Biography on Wikipedia</Text>
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            data={races}
                            keyExtractor={race => race.Circuit.url + race.Circuit.lat + race.date}
                            renderItem={({item}) => {
                                return <RacesList data={item} onPress={() => onPress(item.season, item.round)}/>
                            }}
                        />
                    </ScrollView>
                </>
            }
        </View>
    )
}

DriverDetails.navigationOptions = ({navigation}) => {
    return {
        headerRight: <TouchableOpacity onPress={() => navigation.navigate('Seasons')}>
            <Text style={styles.headerText}>Seasons</Text>
        </TouchableOpacity>
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10
    },
    link: {
        color: 'blue',
        fontWeight: 'bold'
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 18,
        marginRight: 20
    },
    containerName: {
        flexDirection: 'row'
    },
    name: {
        fontWeight: 'bold'
    },
    containerData: {
        height: 100,
        justifyContent: 'space-between'
    }
})

const mapStateToProps = ({data}) => {
    const {details, loading, errorMessage, races} = data

    return {details, loading, errorMessage, races}
}

export default connect(mapStateToProps, {onPressFormHandler})(DriverDetails)
