import React from 'react'
import './App.css'

import AppHeader from './components/AppHeader/AppHeader'
import SearchPanel from './components/SearchPanel/SearchPanel'
import TodoList from './components/TodoList/TodoList'
import ItemStatusFilter from './components/ItemStatusFilter/ItemStatusFilter'
import ItemAddForm from './components/ItemAddForm/ItemAddForm'




export default () => (
      <div className='App'>
        <AppHeader />
        <div className='searchPanel d-flex'>
          <SearchPanel />
          <ItemStatusFilter />
        </div>
        <TodoList  />
        <ItemAddForm />
      </div>
    )
