import React, {useContext} from 'react'
import './AppHeader.css'
import {AppContext} from '../../context/appContext'



export default () => {
  const {toDo, done} = useContext(AppContext)
  return (
  <div className='AppHeader d-flex' >
     <h1>Todo List</h1>
     <h2>{toDo} more to do, {done} done</h2>
   </div>
)}
