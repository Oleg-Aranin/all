import React, {useContext} from 'react'
import classes from './Preview.module.css'
import {Route} from 'react-router-dom'
import {AppContext} from '../context/appContext'


export default  props => {
const {state} = useContext(AppContext)
let photoItem = state.photos || []

let photo = photoItem.map((item) => {
   return (
     <Route
         key={item.id}
         path={`/timeline/${item.id}`}
         render={() => ( <img src={item._links.image_middle.href} alt='ph'/> )} />
   )
})
  return (
   <div className={classes.Preview}>
    { photo }
   </div>
)
}
