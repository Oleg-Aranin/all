import React from 'react'
import './ItemAddForm.css'

export default props =>(
      <form
        className='bottomPanel d-flex'
        onSubmit={props.onSubmit}>

        <input type="text"
               className='form-control newTodoLabel'
               value={props.label}
               onChange={props.onLabelChange}
               placeholder="What needs to be done?" />

        <button type="submit"
                className="btn btn-outline-secondary">Add</button>
      </form>
    )
