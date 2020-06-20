import React from 'react'
import classes from './Preview.module.css'
import {Route} from 'react-router-dom'

export default  props => {

let x = props.state || []


let photo = x.map((item) => {

   return (
     <Route
         key={item.id}
         path={`/timeline/${item.id}`}
         render={() => (
         <img
             src={item._links.image_middle.href}
       />
     )}
     />
   )
})


  return (
   <div className={classes.Preview}>
    { photo }
   </div>
)
}
