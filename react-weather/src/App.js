import React, {Component} from 'react'
import './App.css'
import Info from './components/Info'
import Form from './components/Form'
import Wether from './components/Wether'
import './App.css'

let key = "70e1ed322b02acbc57d443dd91065f3e"

class App extends Component {

  state = {
    temp: '',
    city: '',
    country: '',
    sunset: '',
    pressure: '',
    error: '',
    temp_max: '',
    temp_min: '',
    speed: '',
    img: ''
  }

 gettingWeather = async (e) => {
   e.preventDefault()
   const city = e.target.elements[0].value

   if(city) {
   const apiUrl = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`)
   const data = await apiUrl.json()


  if (data.cod !== "400" && data.cod !== "404") {

   const setDate = (sunData) => {
     let date = new Date()
     date.setTime(sunData)
     console.log(date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds())
     return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()

   }

   console.log(data)

   this.setState({
     temp: data.main.temp,
     city: data.name,
     country: data.sys.country,
     sunset: setDate(data.sys.sunset),
     pressure: data.main.pressure,
     temp_max: data.main.temp_max,
     temp_min: data.main.temp_min,
     error: '',
     clouds: data.clouds.all,
     speed: data.wind.speed,
     img: data.weather[0].icon
   })
 } else {
   this.setState({
     temp: '',
     city: '',
     country: '',
     sunset: '',
     pressure: '',
     error: 'Enter the name of the city',
     temp_max: '',
     temp_min: '',
     clouds: '',
     speed: '',
     img: ''
 })
}
}
 }

  render() {
  return (

   <div className="App">
     <header className="App-header">
       <div className='container'>
         <div className='row'>

            <div className='col-sm-12 col-md-7 info'>
              <Info/>
             </div>

           <div className='col-sm-12 col-md-5 form'>
      <Form gettingWeather={this.gettingWeather}/>
      {this.state.temp && <Wether state={this.state}/>}
      <p className='error'>{this.state.error}</p>
          </div>

        </div>
      </div>
    </header>
  </div>
  )
}
}

export default App
