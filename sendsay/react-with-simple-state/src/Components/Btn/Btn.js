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
      disabled={props.disabled.loadPage || !props.disabled.isFormValid}
      onClick={props.sandRequest}

   >{props.text}
  </button>
)}
{/*onClick={props.onClick}*/}
