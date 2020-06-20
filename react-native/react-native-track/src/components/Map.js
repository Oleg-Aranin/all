import React, {useContext} from 'react'
import {StyleSheet, ActivityIndicator} from 'react-native'
import MapView, {Polyline, Circle} from 'react-native-maps'
import {Context} from "../context/LocationContext";


export default () => {
    const {state: {currentLocation, locations}} = useContext(Context)

    if (!currentLocation) {
        return <ActivityIndicator size='large' style={{marginTop: 200}}/>
    }

    return <MapView
        style={styles.map}
        initialRegion={{
            ...currentLocation.coords,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
        }}
    >
        <Circle
            center={currentLocation.coords}
            radius={30}
            strokeColor='rgba(158, 158, 255, 1.0)'
            fillColor='rgba(158, 158, 255, 0.3)'
        />
        <Polyline coordinates={locations.map(loc => loc.coords)}/>
    </MapView>
}

const styles = StyleSheet.create({
    map: {
        height: 300
    }
})
