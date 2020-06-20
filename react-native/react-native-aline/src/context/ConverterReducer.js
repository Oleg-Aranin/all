import {
    ADD_LIST_CURRENCIES,
    SET_AMOUNT,
    SET_ERROR_MESAGE,
    SET_FROM_CURRENCY,
    SET_LOADING,
    SET_TO_CURRENCY
} from "./types"


const handlers = {
    [ADD_LIST_CURRENCIES]: (state, {payload}) => ({...state, listCurrencies: payload, errorMessage: null, loading: false}),
    [SET_AMOUNT]: (state, {payload}) => ({...state, amount: payload}),
    [SET_ERROR_MESAGE]: (state, {payload}) => ({...state, errorMessage: payload, loading: false}),
    [SET_FROM_CURRENCY]: (state, {payload}) => ({...state, fromCurrencyData: payload}),
    [SET_LOADING]: state => ({...state, loading: true}),
    [SET_TO_CURRENCY]: (state, {payload}) => ({...state, toCurrencyData: payload}),
    DEFAULT: state => state
}


export const appReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}
