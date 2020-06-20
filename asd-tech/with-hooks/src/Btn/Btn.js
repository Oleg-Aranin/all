import React, {useContext} from 'react'
import classes from './Btn.module.css'
import {AppContext} from '../context/appContext'

export default () => {
  const {state, authorization} = useContext(AppContext)

  const cls = [
      classes.Btn,
      classes["primary"]
    ]

  return (
    <button
      className={cls.join(' ')}
      disabled={!state.isFormValid}
      onClick={authorization}
   >Sign in
  </button>
)}
