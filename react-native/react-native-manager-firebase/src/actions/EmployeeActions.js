import firebase from "firebase";
import {EMPLOYEE_UPDATE, EMPLOYEE_CREATE, EMPLOYEES_FETCH_SUCCESS} from "./types";


export const employeeUpdate = (prop, value) => {
    return {
        type: EMPLOYEE_UPDATE,
        payload: {prop, value}
    }
}

export const employeeCreate = ({name, phone, shift}, callback) => {

    const {currentUser} = firebase.auth()

    return dispatch => {

        firebase.database().ref(`/users/${currentUser.uid}/employees`)
            .push({name, phone, shift})
            .then(() => {
                callback()
                dispatch({type: EMPLOYEE_CREATE})
            })

    }
}

export const employeesFetch = () => {
    const {currentUser} = firebase.auth()


    return dispatch => {
        firebase.database().ref(`/users/${currentUser.uid}/employees`)
            .on('value', snapshot => {
                dispatch({
                    type: EMPLOYEES_FETCH_SUCCESS,
                    payload: snapshot.val()
                })
            })
    }
}

export const employeeSave = ({name, phone, shift, uid}, callback) => {

    const {currentUser} = firebase.auth()

    return dispatch => {

        firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
            .set({name, phone, shift})
            .then(() => {
                callback()
                dispatch({type: EMPLOYEE_CREATE})
            })

    }
}

export const employeeDelete = ({uid}, callback) => {
    const {currentUser} = firebase.auth()

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
            .remove()
            .then(() => {
                callback()
            })
    }
}
