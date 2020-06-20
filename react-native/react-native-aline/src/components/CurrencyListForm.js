import React from 'react'
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native'

const CurrencyListForm = ({results, setCurrency}) => {
    return (
        <View>
            <FlatList
                data={results}
                keyExtractor={currency => currency.title}
                renderItem={({item}) => {
                    return <TouchableOpacity onPress={() => setCurrency(item)}>
                        <View style={styles.row}>
                            <View>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.symbol}>{item.symbol}</Text>
                            </View>
                            <View style={styles.wrap}>
                                <Text style={styles.value}>{item.value}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                }}
            />
        </View>
    )
}

CurrencyListForm.navigationOptions = ({navigation}) => {
    return {
        headerRight: <TouchableOpacity onPress={() => navigation.navigate('Create')}>
            <Feather name='plus' size={30}/>
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderColor: 'gray',
        paddingHorizontal: 10
    },
    title: {
        fontSize: 18,
        marginLeft: 20
    },
    value: {
        marginRight: 20,
        fontSize: 16
    },
    symbol: {
        marginTop: 10
    },
    wrap: {
        justifyContent: 'center'
    }
})

export default CurrencyListForm
