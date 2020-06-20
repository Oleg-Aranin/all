import React, {useEffect} from 'react'
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import {Picker, Button} from "native-base";
import {setPicker, getSeasonsListHandler, onPressFormHandler} from "../store/actions/AppActions";
import {connect} from "react-redux";
import SeasonsList from "../components/SeasonsList";
import Spinner from "../components/Spinner";
import SeasonHeader from "../components/SeasonHeader";


const SeasonsScreen = ({setPicker, picker, pickerValue, seasonsList, getSeasonsListHandler, loading, navigation, onPressFormHandler}) => {
    useEffect(() => {
        getSeasonsListHandler()
    }, [])

    const date = picker.map(item => {
        return <Picker.Item label={item.toString()} value={item} key={item}/>
    })

    const setListSeasons = () => {
        if (loading) {
            return <Spinner/>
        }

        const onPress = (season, round) => {
            onPressFormHandler(season, round)
            navigation.navigate('RaceDetails')
        }

        return (
            <FlatList
                data={seasonsList}
                keyExtractor={season => season.url}
                renderItem={({item}) => {
                    return <TouchableOpacity onPress={() => onPress(item.season, item.round)}>
                        <SeasonsList data={item}/>
                    </TouchableOpacity>
                }}
            />
        )
    }


    return (
        <>
            <View style={styles.container}>
                <Picker
                    note
                    mode="dropdown"
                    style={styles.pickerStyle}
                    selectedValue={pickerValue}
                    onValueChange={text => setPicker(text)}
                >

                    {date.reverse()}

                </Picker>
                <Button
                    onPress={getSeasonsListHandler}
                    style={styles.buttonStyle}
                    primary
                >
                    <Text> Get Season </Text>
                </Button>
            </View>
            <View>
                <SeasonHeader/>

                {setListSeasons()}

            </View>
        </>
    )
}

SeasonsScreen.navigationOptions = ({navigation}) => {
    return {
        headerRight: <TouchableOpacity onPress={() => navigation.navigate('Drivers')}>
            <Text style={styles.headerText}>Drivers</Text>
        </TouchableOpacity>
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
        paddingHorizontal: 15
    },
    pickerStyle: {
        width: 10
    },
    buttonStyle: {
        paddingHorizontal: 10,
        marginLeft: 150
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 18,
        marginRight: 20
    }
})

const mapStateToProps = ({data}) => {
    const {picker, pickerValue, seasonsList, loading} = data

    return {picker, pickerValue, seasonsList, loading}
}


export default connect(mapStateToProps, {setPicker, getSeasonsListHandler, onPressFormHandler})(SeasonsScreen)
