import {
  ON_CHANGE_CONTROL_NAME,
  AUTHORIZATION_TOKEN_USER_ID,
  AUTHORIZATION_TOKEN_TRUE,
  GET_PHOTOS_RESPONSE,
  CLIAN_STATE
} from '../actions/actionTypes'


const initialState = {
  isFormValid: false,

  formControls: {
    email: {
             value: '',
             type: 'email',
             id: 'email',
             label: 'Login',
             errorMessage: 'Введите корректный email или телефон',
             valid: false,
             touched: false,
             validation: {
               required: true,
               email: true
             }
         },
    password: {
            value: '',
            type: 'password',
            label: 'Password',
            errorMessage: 'Введите корректный пароль',
            valid: false,
            touched: false,
            validation: {
              required: true,
              minLength: 1
            }
        }
  },

  errorAuth: false,
  token: localStorage.getItem('token') || '',
  userid: localStorage.getItem('userid') || '',

  requestEmail: 'https://saas.cloudike.com/api/2/accounts/login/',
  requestPhone: 'https://saas.cloudike.com/api/2/accounts/login_by_phone/',

  photos: JSON.parse(localStorage.getItem('photos')) || '',

  showPreviewItem: {}
 }





export default function appReducer(state = initialState, action) {

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
}
