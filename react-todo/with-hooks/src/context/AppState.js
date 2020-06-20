import React, {useReducer, useState} from 'react'
import {AppContext} from './appContext'
import appReducer from './appReducer'
import {
  ON_SEARCH_PANEL_CHANGE,
  ON_LABEL_ITEM_CHANGE,
  ON_SUBMIT_CLEAR_LABEL,
  ON_ITEM_ADDED,
  ON_TOGGLE_DONE,
  ON_TOGGLE_IMPORTANT,
  ON_DELETE_ITEM,
  ON_EDIT_ITEM,
  ON_EDIT_TODO_VALUE,
  ON_FILTER_CHANGE,
  ON_SEARCH_CHANGE,
  ON_EDIT_CHANGE
} from './types'

export default ({children}) => {

  const initialState = {
    items: [
      { id: 1, label: 'Drink Coffee', important: false, done: false, edit: false },
      { id: 2, label: 'Learn React', important: true, done: false, edit: false },
      { id: 3, label: 'Make Awesome App', important: false, done: false, edit: false }
    ],
    filter: 'all',
    search: '',

    itemAddFormLabel: '',

    searchPanelTerm: '',

    editTodoItemValue: []
  }

const [state, dispatch] = useReducer(appReducer, initialState)
const [maxId, setMaxId] = useState(100)



const onTermChange = (e) => {
  dispatch({
      type: ON_SEARCH_PANEL_CHANGE,
      payload: e.target.value
    })

  onSearchChange(e.target.value)
}


const onLabelChange = (e) => {
  dispatch({
      type: ON_LABEL_ITEM_CHANGE,
      payload: e.target.value
    })
}

const onSubmit = (e) => {
  e.preventDefault()
  dispatch({
      type: ON_SUBMIT_CLEAR_LABEL
    })

  onItemAdded(state.itemAddFormLabel)
}

function onItemAdded(label) {
  let item = createItem(label)
  dispatch({
      type: ON_ITEM_ADDED,
      payload: [...state.items, item]
    })
}

const toggleProperty = (arr, id, propName) => {
  const idx = arr.findIndex((item) => item.id === id)
  const oldItem = arr[idx]
  const value = !oldItem[propName]

  const item = { ...arr[idx], [propName]: value }
  return [
    ...arr.slice(0, idx),
    item,
    ...arr.slice(idx + 1)
  ]
}

const onToggleDone = (id) => {
  const items = toggleProperty(state.items, id, 'done')
  dispatch({
      type: ON_TOGGLE_DONE,
      payload: items
    })
}

const onToggleImportant = (id) => {
  const items = toggleProperty(state.items, id, 'important')
  dispatch({
      type: ON_TOGGLE_IMPORTANT,
      payload: items
    })
}

const onDelete = (id) => {
    const idx = state.items.findIndex((item) => item.id === id)
    const items = [
      ...state.items.slice(0, idx),
      ...state.items.slice(idx + 1)
    ]
  dispatch({
      type: ON_DELETE_ITEM,
      payload: items
    })
}

const onEdit = (id) => {
  const editObject = state.items.filter(item => item.id === id)

 if (editObject[0].edit) {
   dispatch({
       type: ON_EDIT_ITEM,
       payload: state.editTodoItemValue
     })
 }

  const items = toggleProperty(state.items, id, 'edit')
  dispatch({
      type: ON_EDIT_TODO_VALUE,
      payload: items
    })
}

const onFilterChange = (filter) => {
  dispatch({
      type: ON_FILTER_CHANGE,
      payload: filter
    })
}

const onSearchChange = (search) => {
  dispatch({
      type: ON_SEARCH_CHANGE,
      payload: search
    })
}

function createItem(label) {
  setMaxId(maxId + 1)
  return {
    id: maxId,
    label,
    important: false,
    done: false,
    edit: false
  }
}

const filterItems = (items, filter) => {
  if (filter === 'all') {
    return items
  } else if (filter === 'active') {
    return items.filter((item) => (!item.done))
  } else if (filter === 'done') {
    return items.filter((item) => item.done)
  }
}

const searchItems = (items, search) => {
  if (search.length === 0) {
    return items
  }

  return items.filter((item) => {
    return item.label.toLowerCase().indexOf(search.toLowerCase()) > -1
  })
}

const onEditChange = (e, id) => {

let editTodoItemValue = state.items.map(item => {
  if (item.id === id) {
    item.label = e.target.value
  }
  return item
})
  dispatch({
      type: ON_EDIT_CHANGE,
      payload: editTodoItemValue
    })
}

const done = state.items.filter((item) => item.done).length
const toDo = state.items.length - done

  return (
   <AppContext.Provider value={{
     state, onSubmit, onLabelChange, onFilterChange, onTermChange,
     onEditChange, onToggleImportant, onToggleDone, onDelete, onEdit,
     searchItems, filterItems, done, toDo
   }} >
     {children}
   </AppContext.Provider>
)}
