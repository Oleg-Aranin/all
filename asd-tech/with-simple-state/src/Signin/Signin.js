import React from 'react'
import classes from './Signin.module.css'
import Input from '../Input/Input'
import Btn from '../Btn/Btn'



export default props => {


    const inputArray = Object.keys(props.state.formControls).map((controlName, index) => {
           const control = props.state.formControls[controlName]

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
               onChange={e => props.onChange(e, controlName)}
             />
           )
         })

  return (


   <div className={classes.Signin}>
     <span className={'error'}> {props.state.errorAuth ? 'Ошибка авторизации' : null} </span>
     <h4>Sign in</h4>
     {inputArray}

     <Btn
         type="primary"
         disabled={props.state}
         authorization={props.authorization}
   />
   </div>

)}
