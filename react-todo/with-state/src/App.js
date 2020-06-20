import React, { Component } from 'react'
import './App.css'

import AppHeader from './components/AppHeader/AppHeader'
import SearchPanel from './components/SearchPanel/SearchPanel'
import TodoList from './components/TodoList/TodoList'
import ItemStatusFilter from './components/ItemStatusFilter/ItemStatusFilter'
import ItemAddForm from './components/ItemAddForm/ItemAddForm'




export default class App extends Component {

  maxId = 100

  state = {
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

  onTermChange = (e) => {
    this.setState({
      searchPanelTerm: e.target.value
    })

    this.onSearchChange(e.target.value)
  }


  onLabelChange = (e) => {
    this.setState({
      itemAddFormLabel: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.setState({ itemAddFormLabel: '' })

    this.onItemAdded(this.state.itemAddFormLabel)
  }

  onItemAdded = (label) => {
    this.setState((state) => {
      const item = this.createItem(label)
      return { items: [...state.items, item] }
    })
  }

  toggleProperty = (arr, id, propName) => {
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

  onToggleDone = (id) => {
    this.setState((state) => {
      const items = this.toggleProperty(state.items, id, 'done')
      return { items }
    })
  }

  onToggleImportant = (id) => {
    this.setState((state) => {
      const items = this.toggleProperty(state.items, id, 'important')
      return { items }
    })
  }

  onDelete = (id) => {
    this.setState((state) => {
      const idx = state.items.findIndex((item) => item.id === id)
      const items = [
        ...state.items.slice(0, idx),
        ...state.items.slice(idx + 1)
      ]
      return { items }
    })
  }

  onEdit = (id) => {
    const editObject = this.state.items.filter(item => item.id === id)

   if (editObject[0].edit) {
     this.setState( {
       items: this.state.editTodoItemValue
     })
   }

    this.setState((state) => {
      const items = this.toggleProperty(state.items, id, 'edit')
      return { items, editTodoItemValue: items }
    })
  }

  onFilterChange = (filter) => {
    this.setState({ filter })
  }

  onSearchChange = (search) => {
    this.setState({ search })
  }

  createItem(label) {
    return {
      id: ++this.maxId,
      label,
      important: false,
      done: false,
      edit: false
    }
  }

  filterItems(items, filter) {
    if (filter === 'all') {
      return items
    } else if (filter === 'active') {
      return items.filter((item) => (!item.done))
    } else if (filter === 'done') {
      return items.filter((item) => item.done)
    }
  }

  searchItems(items, search) {
    if (search.length === 0) {
      return items
    }

    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(search.toLowerCase()) > -1
    })
  }

  onEditChange = (e, id) => {

  let editTodoItemValue = this.state.items.map(item => {
    if (item.id === id) {
      item.label = e.target.value
    }
    return item
  })

    this.setState({
      editTodoItemValue
    })
  }

  render() {
    const { items, filter, search } = this.state
    const doneCount = items.filter((item) => item.done).length
    const toDoCount = items.length - doneCount
    const visibleItems = this.searchItems(this.filterItems(items, filter), search)

    return (
      <div className='App'>
        <AppHeader toDo={toDoCount} done={doneCount}/>

        <div className='searchPanel d-flex'>
          <SearchPanel
            term={this.state.searchPanelTerm}
            onTermChange={this.onTermChange}/>

          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange} />
        </div>

        <TodoList
          items={ visibleItems }
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
          onDelete={this.onDelete}
          onEdit={this.onEdit}
          onEditChange={this.onEditChange}
          editTodoItemValue={this.state.editTodoItemValue} />

        <ItemAddForm
          label={this.state.itemAddFormLabel}
          onLabelChange={this.onLabelChange}
          onSubmit={this.onSubmit} />
      </div>
    )
  }
}
