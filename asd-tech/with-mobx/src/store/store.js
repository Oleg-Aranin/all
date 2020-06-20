import {observable, computed, action, decorate} from 'mobx'
import axios from 'axios'



class Store {
 state = initialState()

 onChange = (e, controlName) => {
  let control = this.state.formControls[controlName]
    control.value = e.target.value
    control.touched = true
    control.valid = this.validateControl(control.value, control.validation)
    this.state.isFormValid = true

    Object.keys(this.state.formControls).forEach(name => {
      this.state.isFormValid = this.state.formControls[name].valid && this.state.isFormValid
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



this.state.token = response.data.token
this.state.userid = response.data.userid


  this.getPhotos()

    }
    catch(e) {
       this.state.errorAuth = true
    }
  }

getPhotos = async () => {

try {

  let response =  await axios.get( `https://saas.cloudike.com/api/3/users/${this.state.userid}/photos/items/`, { headers: { 'Mountbit-Auth': this.state.token } })

  let photos = response.data._embedded.items
  let jsonPhotos = JSON.stringify(photos)
  localStorage.setItem('photos', jsonPhotos)

  this.state.errorAuth = false
  this.state.photos = photos

  }  catch(e) {

this.state.errorAuth = true
}
}

  signOut = () => {

   if (this.state.token) {
     localStorage.clear()

       this.state.token = ''
       this.state.userid = ''
       this.state.photos = ''
   }
  }
}

decorate(Store, {
  state: observable,
  onChange: action,
  authorization: action,
  getPhotos: action,
  signOut: action
})

export default  new Store();


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
