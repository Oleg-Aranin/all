import React from 'react';
import Shop from './Shop/Shop'
import {observer} from 'mobx-react';
import Cart from './Cart/Cart'
import {Route, NavLink, Redirect} from 'react-router-dom'
import Details from './Details/Details'
import Allstore from './store/allstore'
import Form from './form/Form/Form'
import Congratulation from './Congratulation/Congratulation'
import classes from './App.module.css'


@observer class App extends React.Component{
    render(){
        return (

          <div className="container">

              <div className={`row sticky-top ${classes.reactHeader}`}>
                <div className="col-sm-4">
                  <NavLink to='/' className="btn btn-primary btn-block" exact >Home</NavLink>
                  </div>

                <div className="col-sm-4">
                  <NavLink to='/cart' className="btn btn-primary btn-block" onClick={Allstore.listItenInCart}>Cart</NavLink>
                  </div>

                <div className="col-sm-4">
                  <NavLink to='/order' className="btn btn-primary btn-block">Order now</NavLink>
                </div>
                </div>


                <div className="row">
                <div className="col-sm-12">
                  <Route path='/' component={Shop} exact/>
                  <Route path='/cart' component={Cart} exact/>
                  <Route path='/:name' component={Details} />
                  <Route path='/order' component={Form} />
                  <Route path='/congratulation' component={Congratulation} />
                  <Redirect to={'/'}/>
                </div>

              </div>
            </div>
        )
    }
}

export default App
