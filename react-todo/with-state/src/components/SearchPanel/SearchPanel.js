import React from 'react'
import './SearchPanel.css'

export default props => (
      <input type="text"
             className='form-control searchInput'
             placeholder="type to search"
             value={props.term}
             onChange={ props.onTermChange } />
    )
