import React from 'react'
import classes from './Btn.module.css'

export default props => {

  const cls = [
      classes.Btn,
      classes[props.type]
    ]

  return (
    <button
      className={cls.join(' ')}
      disabled={!props.disabled.isFormValid}
      onClick={props.authorization}

   >Sign in
  </button>
)}
