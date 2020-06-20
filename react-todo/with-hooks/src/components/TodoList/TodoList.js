import React, {useContext} from 'react'
import TodoListItem from './TodoListItem/TodoListItem'
import './TodoList.css'
import {AppContext} from '../../context/appContext'


const TodoList = () => {

    const {state, searchItems, filterItems} = useContext(AppContext)

    const items = searchItems(filterItems(state.items, state.filter), state.search)

  const elements = items.map((item) => {
    const { id, ...itemProps } = item
    return (
      <li key={id} className="list-group-item">
        <TodoListItem { ...itemProps } id={id}/>
      </li>
    )
  })

  return (<ul className='TodoList list-group'>{ elements }</ul>)
}

export default TodoList
