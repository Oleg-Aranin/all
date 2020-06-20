import React, {useReducer} from 'react'
import axios from 'axios'
import {AppContext} from './appContext'
import appReducer from './appReducer'
import {
  ON_CHANGE_CONTROL_NAME,
  AUTHORIZATION_TOKEN_USER_ID,
  AUTHORIZATION_TOKEN_TRUE,
  GET_PHOTOS_RESPONSE,
  CLIAN_STATE
} from './types'


export const AppState = ({children}) => {

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


   const [state, dispatch] = useReducer(appReducer, initialState)



   const authorization = async () => {

    let  emailPassword = {
      email: state.formControls.email.value,
      password: state.formControls.password.value
    }

    let request = ''

    if (phonenumber(state.formControls.email.value)) {
      request = state.requestPhone
    } else {
      request =  state.requestEmail
    }

    try {

   let response =  await axios.post(request, emailPassword)

   localStorage.setItem('token', response.data.token)
   localStorage.setItem('userid', response.data.userid)

  let token = response.data.token
  let userid = response.data.userid

    dispatch(authorizationTokenUserId(token, userid))
    }
    catch(e) {
    dispatch(authorizationTokenTrue())
    }
  }

  const authorizationTokenUserId = (token, userid) => {

    return {
      type: AUTHORIZATION_TOKEN_USER_ID,
      token,
      userid
    }
  }

  const authorizationTokenTrue = () => {
    return {
      type: AUTHORIZATION_TOKEN_TRUE
    }
  }

  const getPhotos = async () => {

    try {

    let response =  await axios.get( `https://saas.cloudike.com/api/3/users/${state.userid}/photos/items/`, { headers: { 'Mountbit-Auth': state.token } })

    let photos = response.data._embedded.items
    let jsonPhotos = JSON.stringify(photos)
    localStorage.setItem('photos', jsonPhotos)

    dispatch(getPhotosResponse(photos))

    }  catch(e) {

    dispatch(authorizationTokenTrue())
  }
  }

  const getPhotosResponse = (photos) =>{
    return {
      type: GET_PHOTOS_RESPONSE,
      photos
    }
  }

  const signOut = () => {

   if (state.token) {
     localStorage.clear()
     dispatch(cleanState())
   }

  }

  const cleanState = () => {
    return {
      type: CLIAN_STATE,
  }
}



  const onChange = (e, controlName) => {

    let formControls = {...state.formControls}
    let control = {...formControls[controlName]}
      control.value = e.target.value
      control.touched = true
      control.valid = validateControl(control.value, control.validation)

      formControls[controlName] = control

      let isFormValid = true

      Object.keys(formControls).forEach(name => {
        isFormValid = formControls[name].valid && isFormValid
      })

    dispatch(onChangeControlName(formControls, isFormValid))
  }


  const onChangeControlName = (formControls, isFormValid) => {
    return {
      type: ON_CHANGE_CONTROL_NAME,
      formControls,
      isFormValid
    }
  }

  const validateControl = (value, validation) => {

      if (!validation) {
        return true
      }

      let isValid = true

      if (validation.required) {
        isValid = value.trim() !== '' && isValid
      }

      if (validation.email) {
        isValid = (phonenumber(value) || validateEmail(value)) && isValid
      }

      if (validation.minLength) {
        isValid = value.length >= validation.minLength && isValid
      }

      return isValid
    }

    function validateEmail(email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function phonenumber(inputtxt) {//-
      var phoneno = /^\d[\d\(\)\ -]{4,14}\d$/;
      if(inputtxt.match(phoneno) && inputtxt.length === 11) {
        return true;
      }
      else {

        return false;
      }
    }

    function isInvalid({valid, touched, validation}) {
      return   !valid && !!validation && touched
    }



return (
    <AppContext.Provider value={{
      authorization, signOut, onChange, state, isInvalid, getPhotos
    }}>
      {children}
    </AppContext.Provider>
  )
}
