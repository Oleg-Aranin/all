import React from 'react'
import classes from './Signin.module.css'
import Input from '../Input/Input'
import Btn from '../Btn/Btn'
import {connect} from 'react-redux'


function Signin(props) {

    const inputArray = Object.keys(props.formControls).map((controlName, index) => {
           return (
             <Input
               controlName={controlName}
               key={controlName + index}
             />
           )
         })

  return (
   <div className={classes.Signin}>
     <span className={'error'}> {props.errorAuth ? 'Ошибка авторизации' : null} </span>
     <h4>Sign in</h4>
     {inputArray}
     <Btn />
   </div>
)}

function mapStateToProps(state) {
  return {
    formControls: state.app.formControls,
    errorAuth: state.app.errorAuth
  }
}


export default connect(mapStateToProps)(Signin)
