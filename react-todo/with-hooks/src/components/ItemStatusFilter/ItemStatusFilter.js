import React, {useContext} from 'react'
import {AppContext} from '../../context/appContext'

const filterButtons = [
  { name: 'all', label: 'All' },
  { name: 'active', label: 'Active' },
  { name: 'done', label: 'Done' }
]

const ItemStatusFilter = () => {
    const {state, onFilterChange} = useContext(AppContext)

  const buttons = filterButtons.map(({name, label}) => {
    const isActive = name === state.filter
    const classNames = 'btn ' + (isActive ? 'btn-info' : 'btn-outline-secondary')

    return (
      <button key={name}
              type="button"
              onClick={() => onFilterChange(name)}
              className={classNames}>{label}</button>
    )
  })

  return (
    <div className="btn-group">
      { buttons }
    </div>
  )
}

export default ItemStatusFilter
