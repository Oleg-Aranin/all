import React from 'react'
import classes from './Btn.module.css'
import Store from '../store/store'
import {observer} from 'mobx-react'


const Btn = observer(() => {

  const cls = [
      classes.Btn,
      classes["primary"]
    ]

  return (
    <button
      className={cls.join(' ')}
      disabled={!Store.state.isFormValid}
      onClick={Store.authorization}
   >Sign in
  </button>
)})

export default Btn
