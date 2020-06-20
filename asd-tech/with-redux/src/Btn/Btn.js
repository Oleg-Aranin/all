import React from 'react'
import classes from './Btn.module.css'
import {connect} from 'react-redux'
import {authorization} from '../store/actions/actionBtn'

function Btn(props) {

  const cls = [
      classes.Btn,
      classes["primary"]
    ]

  return (
    <button
      className={cls.join(' ')}
      disabled={!props.isFormValid}
      onClick={props.authorization}

   >Sign in
  </button>
)}

function mapStateToProps(state) {
  return {
    isFormValid: state.app.isFormValid
  }
}

function mapDispatchToProps(dispatch) {
 return {
   authorization: () => dispatch(authorization()),
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(Btn)
