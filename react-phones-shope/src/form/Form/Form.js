import React from 'react'
import classes from './Form.module.css'
import Input from '../Input/Input'
import Allstore from '../../store/allstore'
import {observer} from 'mobx-react';
import Modal from './Modal/Modal'



export default observer ((props) => {

let a = Object.keys(Allstore.state.validationForm.formControls).map((controlName, index) => {
  const control = Allstore.state.validationForm.formControls[controlName]

  return (
    <Input
     key={controlName + index}
     type={control.type}
     value={control.value}
     valid={control.valid}
     touched={control.touched}
     label={control.label}
     shouldValidate={!!control.validation}
     errorMessage={control.errorMessage}
     onChange={event => Allstore.onchangeHandlerForm(event, controlName)}

      />
  )
})
  return (
    <div>

     <div className={classes.Form}>
     <form >


       {a}



     <Modal/>

     <button onClick={() => props.history.push('/cart')}>Back</button>

     </form>

     </div>

    </div>
  )

}
)
