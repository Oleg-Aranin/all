import React from 'react'
import classes from './App.module.css'
import MainPage from './Components/MainPage/MainPage'
import SendSayCampon from './Components/sendsay/SendSayCampon'
import Task from './Components/Task/Task'

function App() {
    return (

      <div className={classes.App} >
        <MainPage />
        <SendSayCampon />
        <div className={classes.task}>
        <Task/>
        </div>
      </div>


   )
  }
export default App
