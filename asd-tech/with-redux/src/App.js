import React from 'react'
import './App.css';
import Signin from './Signin/Signin'
import ImgSmall from './ImgSmall/ImgSmall'
import Header from './Header/Header'
import {Route} from 'react-router-dom'
import Preview from './Preview/Preview'
import {connect} from 'react-redux'


function App(props) {
    return (
      <div>
        <Header />
      <div className="App">

         {
              props.token
         ? <>
             <Route path='/timeline'  component={ImgSmall}/>
             <Route path='/timeline/:id'  component={Preview} />
          </>
         :
          <>
             <Route   component={Signin} />
          </>
         }

      </div>
      </div>
   )

  }

function mapStateToProps(state) {
  return {
    token: state.app.token
  }
}
export default connect(mapStateToProps)(App)
