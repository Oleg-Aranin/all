import React from 'react'
import classes from './Header.module.css'
import {NavLink} from 'react-router-dom'
import Store from '../store/store'
import {observer} from 'mobx-react'


const Header = observer(() => {
  let sign = Store.state.token
  return (
   <div className={classes.Header}>
      <NavLink
         to='/timeline'
         exact
         onClick={Store.signOut}
      >
      { sign ? 'Sign out' : 'Sign in' }
      </NavLink>
   </div>
)})

export default Header
