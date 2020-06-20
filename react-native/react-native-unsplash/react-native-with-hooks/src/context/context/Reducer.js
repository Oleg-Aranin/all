import {SEARCH_PHOTOS, SET_LOADING} from '../types'

const handlers = {
    [SEARCH_PHOTOS]: (state, {payload}) => ({...state, photos: payload, loading: false}),
    [SET_LOADING]: state => ({...state, loading: true}),
    DEFAULT: state => state
}

export const Reducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}
