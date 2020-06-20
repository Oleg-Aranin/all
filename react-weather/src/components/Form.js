import React from 'react'

export default props => (
    <form onSubmit={props.gettingWeather}>
    <input type='text' name="city" data="gg" placeholder='City'/>
    <button>Get weather</button>
    </form>
  )
