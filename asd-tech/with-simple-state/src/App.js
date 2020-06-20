import React, {Component} from 'react'
import './App.css';
import Signin from './Signin/Signin'
import axios from 'axios'
import ImgSmall from './ImgSmall/ImgSmall'
import Header from './Header/Header'
import {Route, Redirect, withRouter, Switch} from 'react-router-dom'
import Preview from './Preview/Preview'


function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function phonenumber(inputtxt) {
  var phoneno = /^\d[\d\(\)\ -]{4,14}\d$/;
  if(inputtxt.match(phoneno) && inputtxt.length === 11) {
    return true;
  }
  else {

    return false;
  }
}

 class App extends Component {

state = initialState()

onChange = (e, controlName) => {
  let formControls = {...this.state.formControls}
  let control = {...formControls[controlName]}
    control.value = e.target.value
    control.touched = true
    control.valid = this.validateControl(control.value, control.validation)

    formControls[controlName] = control

    let isFormValid = true

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })

  this.setState({
    formControls, isFormValid
  })


}


validateControl(value, validation) {
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

  authorization = async () => {

    let state = this.state.formControls

    let  emailPassword = {
      email: state.email.value,
      password: state.password.value
    }

    let request = ''

    if (phonenumber(state.email.value)) {
      request = this.state.requestPhone
    } else {
      request =  this.state.requestEmail
    }

    try {

   let response =  await axios.post(request, emailPassword)

   localStorage.setItem('token', response.data.token)
   localStorage.setItem('userid', response.data.userid)



let token = response.data.token
let userid = response.data.userid

    this.setState({
     errorAuth: false,
     token,
     userid
   })

  this.getPhotos()

    }
    catch(e) {

  this.setState({
       errorAuth: true
     })
    }
  }

getPhotos = async () => {

try {

  let response =  await axios.get( `https://saas.cloudike.com/api/3/users/${this.state.userid}/photos/items/`, { headers: { 'Mountbit-Auth': this.state.token } })

  let photos = response.data._embedded.items
  let jsonPhotos = JSON.stringify(photos)
  localStorage.setItem('photos', jsonPhotos)

  this.setState({
   errorAuth: false,
   photos
 })

  }  catch(e) {

this.setState({
  errorAuth: true
  })
}
  }

  signOut = () => {

   if (this.state.token) {
     localStorage.clear()

     this.setState({
       token: '',
       userid: '',
       photos: ''
     })
   }


  }




  render() {

    return (

      <div>
        <Header
         state={this.state.token}
         signOut={this.signOut}
          />
      <div className="App">

         {
              this.state.token
         ? <>
           <Route path='/timeline'  render={() => (
             <ImgSmall
              state={this.state.photos}
              showPreview={this.showPreview}
               />
             )} />


           <Route path='/timeline/:id'  render={() => (
               <Preview
               state={this.state.photos}
                 />
               )} />
             </>
         :
         <>
         <Route   render={() => (
           <Signin
            state={this.state}
            onChange={this.onChange}
            authorization={this.authorization}
             />
           )} />

         </>
         }
      </div>
      </div>
   )
 }
  }


export default withRouter(App)


function initialState() {
 return {
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
}
