import React from 'react'
import classes from './Signin.module.css'
import Input from '../Input/Input'
import Btn from '../Btn/Btn'
import Store from '../store/store'
import {observer} from 'mobx-react'


const Signin = observer(() => {
   const inputArray = Object.keys(Store.state.formControls).map((controlName, index) => {
          return (
            <Input
              controlName={controlName}
              key={controlName + index}
            />
          )
        })

 return (
  <div className={classes.Signin}>
    <span className={'error'}> {Store.state.errorAuth ? 'Ошибка авторизации' : null} </span>
    <h4>Sign in</h4>
    {inputArray}
    <Btn />
  </div>
)})


export default Signin
