import React, {useContext} from 'react'
import './SearchPanel.css'
import {AppContext} from '../../context/appContext'


export default props => {
  const {state, onTermChange} = useContext(AppContext)
  return (
      <input type="text"
             className='form-control searchInput'
             placeholder="type to search"
             value={state.searchPanelTerm}
             onChange={ onTermChange } />
    )
}
