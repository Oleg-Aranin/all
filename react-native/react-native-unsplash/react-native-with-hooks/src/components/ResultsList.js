import React, {useContext, useEffect} from 'react'
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import {withNavigation} from 'react-navigation'
import ResultsDetail from "./ResultsDetail";
import {Context} from "../context/context/Context";

export default withNavigation(({navigation}) => {

    const { photos, search} = useContext(Context)

    useEffect(() => {
        if (!photos[0]) {
            search()
        }
    }, [])

    return <>
    <Text style={styles.title} >{photos.length} Photos found</Text>
    <View style={styles.container} >

        <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={3}
            data={photos}
            keyExtractor={photos =>  photos.id}
            renderItem={({item}) => {
                return <TouchableOpacity onPress={() => navigation.navigate('ResultsShow', {id: item.id})}>
                    <ResultsDetail result={item} />
                </TouchableOpacity>
            }}
        />
    </View>
        </>
})

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 15,
        marginBottom: 5,
        marginTop: 10
    },
    container: {
        marginBottom: 10,

    }
})
