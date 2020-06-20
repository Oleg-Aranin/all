import React from 'react'
import {StyleSheet, Image} from 'react-native'
import Loading from "../components/Loading";
import {connect} from 'react-redux'

const ResultsShowScreen = ({navigation, state}) => {
    const idPhoto = navigation.getParam('id')
    const photo = state.photos.find(({id}) => id === idPhoto)

    return state.loading ? <Loading/> : <Image style={{ ...StyleSheet.absoluteFill }} source={ { uri: photo.urls.raw } } />
}

function mapStateToProps(state) {
    return {
        state: state.app
    }
}

export default connect(mapStateToProps)(ResultsShowScreen)
