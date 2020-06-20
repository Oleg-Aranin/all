import React from 'react'

export default ({title, children}) => (
  <div className='form'>
      <h3>{title}</h3>
      {children}
  </div>
)