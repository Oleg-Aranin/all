import React, {useContext} from 'react'
import classes from './Input.module.css'
import {AppContext} from '../context/appContext'


const Input = ({controlName}) => {
  const {state, isInvalid, onChange} = useContext(AppContext)

 const data = state.formControls[controlName]

  const inputType = data.type || 'text'
  const cls = [classes.Input]
  const htmlFor = `${inputType}-${Math.random()}`

  if (isInvalid(data)) {
    cls.push(classes.invalid)
  }

  return (
    <>
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{data.label}</label>
      <input
        type={inputType}
        id={htmlFor}
        value={data.value}
        onChange={(e) => onChange(e, controlName)}
        placeholder={data.placeholder} />

    </div>
    {
      isInvalid(data)
        ? <span >{data.errorMessage || 'Введите верное значение'}</span>
        : null
    }
    </>
  )
}

export default Input
