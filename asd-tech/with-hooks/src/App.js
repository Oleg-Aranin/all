import React, {useContext} from 'react'
import './App.css';
import Signin from './Signin/Signin'
import ImgSmall from './ImgSmall/ImgSmall'
import Header from './Header/Header'
import {Route, withRouter} from 'react-router-dom'
import Preview from './Preview/Preview'
import {AppContext} from './context/appContext'
import Task from './Task/Task'


const App = () => {
const {state} = useContext(AppContext)

  return (
    <div>
      <Header />
      <div className="App">

         {
              state.token
         ? <>
             <Route path='/timeline'  component={ImgSmall}/>
             <Route path='/timeline/:id'  component={Preview} />
           </>
         :
           <>
             <Route   component={Signin} />
           </>
         }

         <Task/>

      </div>
    </div>

   )
 }

export default withRouter(App)
