import {
    SET_ERROR_MESSAGE,
    ADD_LIST_DRIVERS,
    SET_LOADING,
    ADD_DETAILS_DRIVER,
    ADD_DETAILS_RACE,
    SET_PICKER,
    SET_SEASONS
} from "../actions/types";

const initialState = {
    drivers: null,
    errorMessage: '',
    loading: false,
    details: null,
    races: [],
    detailsRace: {},
    picker: [2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
    pickerValue: 2019,
    seasonsList: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ERROR_MESSAGE:
            return {...state, errorMessage: action.payload, loading: false}
        case ADD_LIST_DRIVERS:
            return {...state, drivers: action.payload, loading: false, errorMessage: ''}
        case SET_LOADING:
            return {...state, loading: true}
        case ADD_DETAILS_DRIVER:
            return {...state, details: action.payload.details, races: action.payload.races, loading: false, errorMessage: ''}
        case ADD_DETAILS_RACE:
            return {...state, detailsRace: action.payload, loading: false, errorMessage: ''}
        case SET_PICKER:
            return {...state, pickerValue: action.payload}
        case SET_SEASONS:
            return {...state, seasonsList: action.payload, loading: false, errorMessage: ''}
        default:
            return state
    }
}
