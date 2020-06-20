import {ON_CHANGE_CONTROL_NAME} from './actionTypes'



export function onChange(e, controlName) {

 return  (dispatch, getState) => {


  let formControls = {...getState().app.formControls}
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
}

export function onChangeControlName(formControls, isFormValid) {
  return {
    type: ON_CHANGE_CONTROL_NAME,
    formControls,
    isFormValid
  }
}

export function validateControl(value, validation) {

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

  export function validateEmail(email) {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
  }

  export function phonenumber(inputtxt) {
    var phoneno = /^\d[\d\(\)\ -]{4,14}\d$/;
    if(inputtxt.match(phoneno) && inputtxt.length === 11) {
      return true;
    }
    else {

      return false;
    }
  }

  export function isInvalid({valid, touched, validation}) {
    return   !valid && !!validation && touched
  }
