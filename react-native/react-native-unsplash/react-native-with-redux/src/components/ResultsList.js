import React, {useEffect} from 'react'
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import {withNavigation} from 'react-navigation'
import ResultsDetail from "./ResultsDetail";
import {connect} from 'react-redux'
import {search} from "../store/actions/actions";


const ResultsList = ({navigation, state, search}) => {

    useEffect(() => {
        if (!state.photos[0]) {
            search()
        }
    }, [])

    return <>
    <Text style={styles.title} >{state.photos.length} Photos found</Text>
    <View style={styles.container} >

        <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={3}
            data={state.photos}
            keyExtractor={photos =>  photos.id}
            renderItem={({item}) => {
                return <TouchableOpacity onPress={() => navigation.navigate('ResultsShow', {id: item.id})}>
                    <ResultsDetail result={item} />
                </TouchableOpacity>
            }}
        />
    </View>
        </>
}

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

function mapStateToProps(state) {
    return {
        state: state.app
    }
}

function mapDispatchToProps(dispatch) {
    return {
        search: () => dispatch(search())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(ResultsList))
