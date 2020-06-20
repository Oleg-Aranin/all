import React from 'react'
import classes from './Header.module.css'
import {NavLink} from 'react-router-dom'

export default props => {

let sign = props.state

  return (
   <div className={classes.Header}>
      <NavLink
         to='/timeline'
         exact
         onClick={props.signOut}
          >

      { sign ? 'Sign out' : 'Sign in' }

      </NavLink>

      
   </div>
)}
