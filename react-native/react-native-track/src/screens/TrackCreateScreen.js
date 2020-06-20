// import '../_mockLocaition'
import React, {useContext, useCallback} from 'react'
import {Text} from 'react-native-elements'
import {SafeAreaView, withNavigationFocus} from "react-navigation";
import Map from "../components/Map";
import {Context} from "../context/LocationContext";
import useLocation from "../hooks/useLocation";
import TrackForm from "../components/TrackForm";
import {FontAwesome} from '@expo/vector-icons'


const TrackCreateScreen = ({isFocused}) => {
    const {state: {recording}, addLocation} = useContext(Context)
    const callback = useCallback((location) => {
        addLocation(location, recording)
    }, [recording])
    const [err] = useLocation(isFocused || recording, callback)

    return (
        <SafeAreaView forceInset={{top: 'always'}}>
            <Text h3>Create a Track</Text>
            <Map/>
            {err ? <Text>Please enable location services</Text> : null}
            <TrackForm/>
        </SafeAreaView>
    )
}

TrackCreateScreen.navigationOptions = {
    title: 'Add Track',
    tabBarIcon: <FontAwesome name='plus' size={20}/>
}

export default withNavigationFocus(TrackCreateScreen)
