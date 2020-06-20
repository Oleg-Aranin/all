import React from 'react'
import './EditTodoListItem.css'

export default ({editTodoItemValue, onEditChange, id}) => {

 let item = editTodoItemValue.filter(item => item.id === id)
  return (
    <input
    type="text"
    className='form-control newTodoLabel EditTodoListItem'
    value={item[0].label}
    onChange={onEditChange} />
)}
