import {
  ON_CHANGE_CONTROL_NAME,
  AUTHORIZATION_TOKEN_USER_ID,
  AUTHORIZATION_TOKEN_TRUE,
  GET_PHOTOS_RESPONSE,
  CLIAN_STATE
} from './types'




export default function appReducer(state, action) {

switch (action.type) {
  case ON_CHANGE_CONTROL_NAME:
    return {
      ...state,
     formControls: action.formControls,
     isFormValid: action.isFormValid
    }
  case AUTHORIZATION_TOKEN_USER_ID:
    return {
      ...state,
     errorAuth: false,
     token: action.token,
     userid: action.userid
    }
  case AUTHORIZATION_TOKEN_TRUE:
    return {
      ...state,
     errorAuth: true
    }
  case GET_PHOTOS_RESPONSE:
    return {
      ...state,
     errorAuth: false,
     photos: action.photos
    }
  case CLIAN_STATE:
    return {
      ...state,
      token: '',
      userid: '',
      photos: ''
    }
  default:
    return state
}
console.log(22)
}
