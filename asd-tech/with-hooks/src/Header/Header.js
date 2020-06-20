import React, {useContext} from 'react'
import classes from './Header.module.css'
import {NavLink} from 'react-router-dom'
import {AppContext} from '../context/appContext'

export default () => {
const {state, signOut} = useContext(AppContext)
  return (
   <div className={classes.Header}>
      <NavLink
         to='/timeline'
         exact
         onClick={signOut} >

      { state.token ? 'Sign out' : 'Sign in' }

      </NavLink>
   </div>
)}
