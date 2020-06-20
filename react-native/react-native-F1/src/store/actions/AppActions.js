import {
    SET_ERROR_MESSAGE,
    ADD_LIST_DRIVERS,
    SET_LOADING,
    ADD_DETAILS_DRIVER,
    ADD_DETAILS_RACE,
    SET_PICKER,
    SET_SEASONS
} from "./types";
import axios from 'axios'


export const getDrivers = () => {
    return async (dispatch) => {
        dispatch({type: SET_LOADING})
        try {
            const response = await axios.get('http://ergast.com/api/f1/drivers.json?limit=1000')

            dispatch({
                type: ADD_LIST_DRIVERS,
                payload: response.data.MRData.DriverTable.Drivers
            })

        } catch {
            dispatch({
                type: SET_ERROR_MESSAGE,
                payload: 'Что то пошло не так'
            })
        }
    }
}

export const getDriverDetails = (id) => {
    return async (dispatch) => {
        dispatch({type: SET_LOADING})
        try {
            const response = await axios.get(`http://ergast.com/api/f1/drivers/${id}.json`)
            const races = await axios.get(`http://ergast.com/api/f1/drivers/${id}/races.json`)

            dispatch({
                type: ADD_DETAILS_DRIVER,
                payload: {
                    details: response.data.MRData.DriverTable.Drivers[0],
                    races: races.data.MRData.RaceTable.Races
                }
            })
        } catch {
            dispatch({
                type: SET_ERROR_MESSAGE,
                payload: 'Что то пошло не так'
            })
        }
    }
}

export const onPressFormHandler = (season, round) => {
    return async (dispatch) => {
        dispatch({type: SET_LOADING})
        try {
            const response = await axios.get(`http://ergast.com/api/f1/${season}/${round}/results.json`)

            dispatch({
                type: ADD_DETAILS_RACE,
                payload: response.data.MRData.RaceTable.Races[0]
            })

        } catch {
            dispatch({
                type: SET_ERROR_MESSAGE,
                payload: 'Что то пошло не так'
            })
        }
    }
}

export const setPicker = (value) => {
    return dispatch => {

        dispatch({
            type: SET_PICKER,
            payload: value
        })
    }
}

export const getSeasonsListHandler = () => {
    return async (dispatch, getState) => {
        dispatch({type: SET_LOADING})
        try {
            const response = await axios.get(`http://ergast.com/api/f1/${getState().data.pickerValue}.json`)

            dispatch({
                type: SET_SEASONS,
                payload: response.data.MRData.RaceTable.Races
            })
        } catch {
            dispatch({
                type: SET_ERROR_MESSAGE,
                payload: 'Что то пошло не так'
            })
        }
    }
}


