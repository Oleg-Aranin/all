import React, {useContext} from 'react'
import {StyleSheet, Image} from 'react-native'
import {Context} from "../context/context/Context";
import Loading from "../components/Loading";

export default ({navigation}) => {
    const idPhoto = navigation.getParam('id')
    const {loading, photos} = useContext(Context)
    const photo = photos.find(({id}) => id === idPhoto)

    return loading ? <Loading/> : <Image style={{ ...StyleSheet.absoluteFill }} source={ { uri: photo.urls.raw } } />
}
