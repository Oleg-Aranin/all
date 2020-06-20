import React from 'react'
import './AppHeader.css'

export default ({toDo, done}) => (
  <div className='AppHeader d-flex' >
     <h1>Todo List</h1>
     <h2>{toDo} more to do, {done} done</h2>
   </div>
)
