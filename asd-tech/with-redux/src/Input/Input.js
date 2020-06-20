import React from 'react'
import classes from './Input.module.css'
import {connect} from 'react-redux'
import {onChange, isInvalid} from '../store/actions/actionInput'


const Input = props => {

  const inputType = props.formControls[props.controlName].type || 'text'
  const cls = [classes.Input]
  const htmlFor = `${inputType}-${Math.random()}`

  if (isInvalid(props.formControls[props.controlName])) {
    cls.push(classes.invalid)
  }

  return (
    <>
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{props.formControls[props.controlName].label}</label>
      <input
        type={inputType}
        id={htmlFor}
        value={props.formControls[props.controlName].value}
        onChange={(e, controlName) => props.onChange(e, props.controlName)}
        placeholder={props.formControls[props.controlName].placeholder}
      />


  </div>
    {
      isInvalid(props.formControls[props.controlName])
        ? <span >{props.formControls[props.controlName].errorMessage || 'Введите верное значение'}</span>
        : null
    }
    </>
  )
}

function mapStateToProps(state) {
  return {
    formControls: state.app.formControls
  }
}

function mapDispatchToProps(dispatch) {
 return {
   onChange: (e, controlName) => dispatch(onChange(e, controlName)),
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(Input)
