import React, {useContext} from 'react'
import classes from './Signin.module.css'
import Input from '../Input/Input'
import Btn from '../Btn/Btn'
import {AppContext} from '../context/appContext'

export default props => {
const {state} = useContext(AppContext)

    const inputArray = Object.keys(state.formControls).map((controlName, index) => {
           return (
             <Input
               key={controlName + index}
               controlName={controlName} />
           )
         })

  return (
   <div className={classes.Signin}>
     <span className={'error'}> { state.errorAuth ? 'Ошибка авторизации' : null } </span>
     <h4>Sign in</h4>

     {inputArray}

     <Btn />
   </div>
)}
