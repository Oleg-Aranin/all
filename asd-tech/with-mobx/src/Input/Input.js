import React from 'react'
import classes from './Input.module.css'

import Store from '../store/store'
import {observer} from 'mobx-react'

function isInvalid({valid, touched, validation}) {
  return !valid && !!validation && touched
}

const Input = observer(props => {

  let input = Store.state.formControls[props.controlName]

  const inputType = input.type || 'text'
  const cls = [classes.Input]
  const htmlFor = `${inputType}-${Math.random()}`

  if (isInvalid(input)) {
    cls.push(classes.invalid)
  }

  return (
    <>
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{input.label}</label>
      <input
        type={inputType}
        id={htmlFor}
        value={input.value}
        onChange={(e) => Store.onChange(e, props.controlName)}
        placeholder={input.placeholder}
      />


    </div>
    {
      isInvalid(input)
        ? <span >{input.errorMessage || 'Введите верное значение'}</span>
        : null
    }
    </>
  )
})

export default Input
