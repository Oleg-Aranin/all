import React, {useReducer, useEffect} from 'react'
import axios from 'axios'
import {Context} from './Context'
import {Reducer} from './Reducer'
import {SEARCH_PHOTOS, SET_LOADING} from '../types'

const initialState = {
    photos: [],
    loading: false,
}

export const State = ({children}) => {

    const [state, dispatch] = useReducer(Reducer, initialState)

    const search = async value => {
        setLoading()

         const response = await axios.get('https://api.unsplash.com/photos/?client_id=cf49c08b444ff4cb9e4d126b7e9f7513ba1ee58de7906e4360afc1a33d1bf4c0')

        dispatch({
            type: SEARCH_PHOTOS,
            payload: response.data
        })
    }

    const setLoading = () => dispatch({type: SET_LOADING})

    const { photos, loading} = state

    return <Context.Provider value={{ photos, loading, search }}>
             {children}
          </Context.Provider>
}
