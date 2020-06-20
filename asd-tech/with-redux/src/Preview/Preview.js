import React from 'react'
import classes from './Preview.module.css'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'

function Preview(props) {
  let x = props.photos || []
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

function mapStateToProps(state) {
  return {
    photos: state.app.photos
  }
}

export default connect(mapStateToProps)(Preview)
