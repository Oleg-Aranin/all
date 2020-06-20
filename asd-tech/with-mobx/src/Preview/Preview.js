import React from 'react'
import classes from './Preview.module.css'
import {Route} from 'react-router-dom'
import Store from '../store/store'
import {observer} from 'mobx-react'


const Preview = observer(() => {
  
let x = Store.state.photos || []
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
)
export default Preview
