import React from 'react'
import classes from './Btn.module.css'
import Store from '../../store/store'
import {observer} from 'mobx-react'

export default observer(() => {
  const cls = [
      classes.Btn,
      classes["primary"]
    ]

  return (
    <button
      className={cls.join(' ')}
      disabled={Store.state.loadPage || !Store.state.isFormValid}
      onClick={Store.sandRequest}
   >
   {Store.state.btn.text}
  </button>
)}
)
