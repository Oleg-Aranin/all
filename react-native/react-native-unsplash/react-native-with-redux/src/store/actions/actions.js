import React from 'react'
import axios from 'axios'
import {SEARCH_PHOTOS, SET_LOADING} from '../actions/actionTypes'


export const search = () => {
     return async (dispatch) => {
        setLoading()

        const response = await axios.get('https://api.unsplash.com/photos/?client_id=cf49c08b444ff4cb9e4d126b7e9f7513ba1ee58de7906e4360afc1a33d1bf4c0')

        dispatch({
            type: SEARCH_PHOTOS,
            payload: response.data
        })
    }}

export const setLoading = () => dispatch => dispatch({type: SET_LOADING})
