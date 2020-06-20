import {CLIAN_STATE} from './actionTypes'

export function signOut() {
  return  (dispatch, getState) => {

 if (getState().app.token) {
   localStorage.clear()
   dispatch(cleanState())
 }
}
}

export function cleanState() {
  return {
    type: CLIAN_STATE,
  }
}
