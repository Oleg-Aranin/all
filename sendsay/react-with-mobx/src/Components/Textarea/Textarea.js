import React from 'react'
import classes from './Textarea.module.css'
import Store from '../../store/store'
import {observer} from 'mobx-react'

function isInvalid({valid, touched, validation}) {
  return !valid && !!validation && touched
}


export default observer(props => {

let input = Store.state.formControls[props.controlName]
const textareaType = input.type || 'text'
const cls = [classes.Textarea]
const htmlFor = `${textareaType}-${Math.random()}`

if (isInvalid(input)) {
  cls.push(classes.invalid)
}

return (
   <div className={cls.join(' ')} >

    <label htmlFor={htmlFor}>{input.label}</label>
    <textarea
    type={textareaType}
    id={htmlFor}
    value={input.value}
    onChange={(e) => Store.onChange(e, props.controlName)}
    placeholder={input.placeholder}
    />

    {
      isInvalid(input)
        ? <span>{input.errorMessage || 'Введите верное значение'}</span>
        : null
    }

   </div>
)}
)
