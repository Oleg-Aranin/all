import React from 'react'
import classes from './Header.module.css'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {signOut} from '../store/actions/actionHeader'


function Header(props) {

let sign = props.token

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

function mapStateToProps(state) {
  return {
    token: state.app.token
  }
}

function mapDispatchToProps(dispatch) {
 return {
   signOut: () => dispatch(signOut())
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
