import {phonenumber} from './actionInput'
import axios from 'axios'
import {
  AUTHORIZATION_TOKEN_USER_ID,
  AUTHORIZATION_TOKEN_TRUE,
  GET_PHOTOS_RESPONSE
} from './actionTypes'

 export function authorization() {
    return  async (dispatch, getState) => {

  let state = getState().app.formControls

  let  emailPassword = {
    email: state.email.value,
    password: state.password.value
  }

  let request = ''

  if (phonenumber(state.email.value)) {
    request = getState().app.requestPhone
  } else {
    request =  getState().app.requestEmail
  }

  try {

 let response =  await axios.post(request, emailPassword)

 localStorage.setItem('token', response.data.token)
 localStorage.setItem('userid', response.data.userid)

let token = response.data.token
let userid = response.data.userid

  dispatch(authorizationTokenUserId(token, userid))
  dispatch(getPhotos())
  }
  catch(e) {
  dispatch(authorizationTokenTrue())
  }
}
}

export function authorizationTokenUserId(token, userid) {
  return {
    type: AUTHORIZATION_TOKEN_USER_ID,
    token,
    userid
  }
}
export function authorizationTokenTrue() {
  return {
    type: AUTHORIZATION_TOKEN_TRUE
  }
}

export function getPhotos() {
 return  async (dispatch, getState) => {
  try {

  let response =  await axios.get( `https://saas.cloudike.com/api/3/users/${getState().app.userid}/photos/items/`, { headers: { 'Mountbit-Auth': getState().app.token } })

  let photos = response.data._embedded.items
  let jsonPhotos = JSON.stringify(photos)
  localStorage.setItem('photos', jsonPhotos)

  dispatch(getPhotosResponse(photos))

  }  catch(e) {
    
  dispatch(authorizationTokenTrue())
}
  }
}
export function getPhotosResponse(photos) {
  return {
    type: GET_PHOTOS_RESPONSE,
    photos
  }
}
