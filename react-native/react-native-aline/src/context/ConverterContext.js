import {
    ADD_LIST_CURRENCIES,
    SET_ERROR_MESAGE,
    SET_LOADING,
    SET_FROM_CURRENCY,
    SET_TO_CURRENCY,
    SET_AMOUNT
} from "./types"
import createDataContext from "./createDataContext"
import axios from "axios"
import {appReducer} from "./ConverterReducer"

const getListCurrencies = 'http://data.fixer.io/api/latest?access_key=013a852fc002fe47d85263e64ae83e1a'
const getListSymbols = 'http://data.fixer.io/api/symbols?access_key=013a852fc002fe47d85263e64ae83e1a'

const initialState = {
    listCurrencies: [],
    errorMessage: null,
    loading: false,
    fromCurrencyData: {},
    toCurrencyData: {},
    amount: ''
}


const search = dispatch => {
    return async () => {
        setLoading(dispatch)
        try {
            const currencies = await axios.get(getListCurrencies)
            const symbols = await axios.get(getListSymbols)

            const data = Object.keys(currencies.data.rates).map(key => {
                return {title: key, value: currencies.data.rates[key], symbol: symbols.data.symbols[key]}
            })

            dispatch({
                type: ADD_LIST_CURRENCIES,
                payload: data
            })
        } catch (e) {
            dispatch({
                type: SET_ERROR_MESAGE,
                payload: 'Что то пошло не так'
            })
        }
    }
}

const setLoading = dispatch => dispatch({type: SET_LOADING})

const fromCurrency = dispatch => {
    return item => {
        dispatch({
            type: SET_FROM_CURRENCY,
            payload: item
        })
    }
}

const toCurrency = dispatch => {
    return item => {
        dispatch({
            type: SET_TO_CURRENCY,
            payload: item
        })
    }
}
const setAmount = dispatch => {
    return item => {

        if (Number(item) && item > 0) {

            dispatch({
                type: SET_AMOUNT,
                payload: item.trim()
            })
        }
    }
}


export const {Context, Provider} = createDataContext(appReducer,
    {search, fromCurrency, toCurrency, setAmount},
    initialState
)


