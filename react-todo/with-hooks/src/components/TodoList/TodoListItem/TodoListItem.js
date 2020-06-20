import React, {useContext} from 'react'
import './TodoListItem.css'
import EditTodoListItem from '../EditTodoListItem/EditTodoListItem'
import {AppContext} from '../../../context/appContext'




const TodoListItem = ({ important, done, label, edit, id }) => {

  const { onToggleImportant, onToggleDone, onDelete, onEdit} = useContext(AppContext)

  let classNames = 'TodoListItem'
  if (important) {
    classNames += ' important'
  }

  if (done) {
    classNames += ' done'
  }

  let labelOrEdit = <span
    className="TodoListItemLabel"
    onClick={() => onToggleDone(id)}>{label}</span>

  if (edit) {
    labelOrEdit = <EditTodoListItem id={id}/>
  }


  return (
    <span className={classNames}>

         { labelOrEdit }

      <button type="button"
              className="btn btn-outline-success btn-sm float-right"
              onClick={() => onToggleImportant(id)}>
        <i className="fa fa-exclamation"></i>
      </button>

      <button type="button"
              className="btn btn-outline-danger btn-sm float-right"
              onClick={() => onDelete(id)}>
        <i className="fa fa-trash-o"></i>
      </button>

      <button type="button"
              className="btn btn-outline-danger btn-sm float-right btn-save"
              onClick={() => onEdit(id)}>

        { edit ? <span className='save'>save</span> : <i className="fa fa-pencil-square"></i> }

      </button>
    </span>
  )
}

export default TodoListItem
