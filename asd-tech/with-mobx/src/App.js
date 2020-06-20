import React from 'react'
import './App.css';
import Signin from './Signin/Signin'
import ImgSmall from './ImgSmall/ImgSmall'
import Header from './Header/Header'
import {Route, withRouter} from 'react-router-dom'
import Preview from './Preview/Preview'
import Store from './store/store'
import {observer} from 'mobx-react'

 const App = observer (() => {
    return (
      <div>
        <Header />
      <div className="App">
         {
              Store.state.token
         ? <>
               <Route path='/timeline'  component={ImgSmall} />
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
)


export default withRouter(App)
