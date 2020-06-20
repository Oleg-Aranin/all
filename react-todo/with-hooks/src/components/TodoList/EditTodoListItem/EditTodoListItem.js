import React, {useContext} from 'react'
import './EditTodoListItem.css'
import {AppContext} from '../../../context/appContext'

export default ({id}) => {

const {state, onEditChange} = useContext(AppContext)

 let item = state.editTodoItemValue.filter(item => item.id === id)
  return (
    <input
    type="text"
    className='form-control newTodoLabel EditTodoListItem'
    value={item[0].label}
    onChange={(e) => onEditChange(e, id)} />
)}
