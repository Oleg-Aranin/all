import React, {useState} from 'react';
import { Text, StyleSheet, Button, View, FlatList} from 'react-native';

export default ({color, onIncrease, onDecrease}) => {

    return <View>
    <Text>{color}</Text>
        <Button onPress={onIncrease} title={`Increase ${color}`}/>
        <Button onPress={onDecrease} title={`Decrease ${color}`}/>
    </View>

}


const styles = StyleSheet.create({

})
