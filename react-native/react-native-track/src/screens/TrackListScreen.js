import React, {useContext} from 'react'
import {StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, View} from 'react-native'
import {ListItem} from 'react-native-elements'
import {NavigationEvents} from "react-navigation";
import {Context} from "../context/TrackContext";

const TrackListScreen = ({navigation}) => {
    const {state, fetchTracks} = useContext(Context)

    const spinner = () => {
        if (!state[0]) {
            return <View style={styles.spinner}>
                <ActivityIndicator/>
            </View>
        }
        return null
    }

    return (
        <>
            <NavigationEvents onWillFocus={fetchTracks}/>
            {spinner()}
            <FlatList
                data={state}
                keyExtractor={({_id}) => _id}
                renderItem={({item}) => {
                    return <TouchableOpacity onPress={() =>
                        navigation.navigate('TrackDetail', {_id: item._id})
                    }>
                        <ListItem chevron title={item.name}/>
                    </TouchableOpacity>
                }}
            />
        </>
    )
}

TrackListScreen.navigationOptions = {
    title: 'Tracks'
}

const styles = StyleSheet.create({
    spinner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default TrackListScreen
