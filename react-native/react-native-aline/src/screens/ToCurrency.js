import React, {useContext} from 'react'
import {View, StyleSheet, Alert} from 'react-native'
import {Context} from "../context/ConverterContext";
import CurrencyListForm from "../components/CurrencyListForm";
import ButtonFromCurrency from "../components/ButtonFromCurrency";
import BaseCurrency from "../components/BaseCurrency";

export default ({navigation}) => {
    const {state, toCurrency} = useContext(Context)
    const {listCurrencies, toCurrencyData, fromCurrencyData, amount} = state

    const direction = () => {
            navigation.navigate('Finish')
    }

    return (
        <View>
            <BaseCurrency
                data={fromCurrencyData}
                amount={amount}
            />
            < ButtonFromCurrency
                currency={toCurrencyData}
                title='Рассчитать'
                onPressHandler={direction}
            />
            <CurrencyListForm
                results={listCurrencies}
                setCurrency={toCurrency}
            />
        </View>
    )
}

const styles = StyleSheet.create({})
