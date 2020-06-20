import {SEARCH_PHOTOS, SET_LOADING} from '../actions/actionTypes'

const initialState = {
    photos: [],
    loading: false,
}

const handlers = {
    [SEARCH_PHOTOS]: (state, {payload}) => ({...state, photos: payload, loading: false}),
    [SET_LOADING]: state => ({...state, loading: true}),
    DEFAULT: state => state
}

export const appReducer = (state = initialState, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}
