import React, {useContext} from 'react'
import './ItemAddForm.css'
import {AppContext} from '../../context/appContext'


export default () => {
const {state, onSubmit, onLabelChange} = useContext(AppContext)

  return (
      <form
        className='bottomPanel d-flex'
        onSubmit={onSubmit}>

        <input type="text"
               className='form-control newTodoLabel'
               value={state.itemAddFormLabel}
               onChange={onLabelChange}
               placeholder="What needs to be done?" />

        <button type="submit"
                className="btn btn-outline-secondary">Add</button>
      </form>
    )}
