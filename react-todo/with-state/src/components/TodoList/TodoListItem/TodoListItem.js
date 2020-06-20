import React from 'react'
import './TodoListItem.css'
import EditTodoListItem from '../EditTodoListItem/EditTodoListItem'




const TodoListItem = ({ important, done,
      label, edit, onToggleImportant, onToggleDone, onDelete, onEdit, onEditChange, editTodoItemValue, id }) => {

  let classNames = 'TodoListItem'
  if (important) {
    classNames += ' important'
  }

  if (done) {
    classNames += ' done'
  }

  let labelOrEdit = <span
    className="TodoListItemLabel"
    onClick={onToggleDone}>{label}</span>

  if (edit) {
    labelOrEdit = <EditTodoListItem  onEditChange={onEditChange} editTodoItemValue={editTodoItemValue} id={id}/>
  }


  return (
    <span className={classNames}>

         { labelOrEdit }

      <button type="button"
              className="btn btn-outline-success btn-sm float-right"
              onClick={onToggleImportant}>
        <i className="fa fa-exclamation"></i>
      </button>

      <button type="button"
              className="btn btn-outline-danger btn-sm float-right"
              onClick={onDelete}>
        <i className="fa fa-trash-o"></i>
      </button>

      <button type="button"
              className="btn btn-outline-danger btn-sm float-right btn-save"
              onClick={onEdit}>

        { edit ? <span className='save'>save</span> : <i className="fa fa-pencil-square"></i> }

      </button>
    </span>
  )
}

export default TodoListItem
