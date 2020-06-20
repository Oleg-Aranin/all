import React, {useState, useContext, useEffect} from 'react'
import {Alert, StyleSheet, TouchableOpacity} from 'react-native'
import Input from "../components/Input";
import {Feather} from '@expo/vector-icons'
import CurrencyListForm from "../components/CurrencyListForm";
import {Context} from "../context/ConverterContext";
import ButtonFromCurrency from '../components/ButtonFromCurrency'
import TechnicalMessage from "../components/TechnicalMessage";


const MainScreen = ({navigation}) => {
    const {search, state, fromCurrency, setAmount} = useContext(Context)
    const {listCurrencies, errorMessage, loading, fromCurrencyData, amount} = state

    useEffect(() => {
        search()
    }, [])

    if (loading) return <TechnicalMessage content='Loading...'/>

    const direction = () => {
        if (amount) {
            navigation.navigate('ToCurrency')
        } else {
            Alert.alert(
                'Введите сумму',
                'число больше нуля',
                [
                    {text: 'OK'}
                ],
                {cancelable: false}
            )
        }
    }

    return (
        <>
            {
                errorMessage ? <TechnicalMessage content={errorMessage}/> :
                    <>
                        <Input
                            amount={amount}
                            onAmountChange={setAmount}
                        />

                        < ButtonFromCurrency
                            currency={fromCurrencyData}
                            title='Продолжить'
                            onPressHandler={direction}
                        />

                        <CurrencyListForm
                            results={listCurrencies}
                            dataCurrency={fromCurrencyData}
                            setCurrency={fromCurrency}
                        />
                    </>
            }
        </>
    )
}

MainScreen.navigationOptions = ({navigation}) => {
    return {
        headerRight: <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Feather name='settings' size={30} style={styles.settings}/>
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    settings: {
        marginRight: 20
    }
})

export default MainScreen
