import React from 'react'

export default props => (
    <div className='infoWeath'>

    <div className='temp'>
    <p>Location: {props.state.city}, {props.state.country}</p>
    <p>Temperature: {props.state.temp}°С    from {props.state.temp_min} to {props.state.temp_max} °С </p>
    <p>Sunset: {`${props.state.sunset}      Wind ${props.state.speed} m/s`}</p>
    <p>Pressure: {props.state.pressure} hpa</p>
    <p>Clouds: {props.state.clouds} %</p>
    </div>

    <div className='img' >
    <img  src={`http://openweathermap.org/img/wn/${props.state.img}@2x.png`}/>
    </div>

    </div>
  )
