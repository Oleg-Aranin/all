import React from 'react';
import { Text, StyleSheet, Image, View } from 'react-native';


export default (props) => {
console.log(props)
    return <View>
        <Image source={props.imageSource}/>
    <Text>{props.title}</Text>
    <Text>Image Score - {props.score}</Text>
    </View>
}
const styles = StyleSheet.create({

})
