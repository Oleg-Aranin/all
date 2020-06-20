import React, {useContext} from 'react'
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import {withNavigation} from 'react-navigation'
import ResultsDetail from "./ResultsDetail";
import {GithubContext} from "../context/context/githubContext";

export default withNavigation(({navigation}) => {

    const {loading, users} = useContext(GithubContext)

    return <>
    <Text style={styles.title} >{users.length} Users found</Text>
    <View style={styles.container} >

        <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={3}
            data={users}
            keyExtractor={users =>  users.html_url}
            renderItem={({item}) => {
                return <TouchableOpacity onPress={() => navigation.navigate('ResultsShow', {login: item.login})}>
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
        marginBottom: 5
    },
    container: {
        marginBottom: 10,

    }
})
