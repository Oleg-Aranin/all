import React, {useContext, useEffect} from 'react'
import classes from './ImgSmall.module.css'
import {withRouter} from 'react-router-dom'
import {AppContext} from '../context/appContext'



function ImgSmall (props) {
const {state, getPhotos} = useContext(AppContext)

useEffect(() => {
    getPhotos()
    // eslint-disable-next-line
  }, [])

let setDate = ''
let imageSmall = ''

if (state.photos) {

let date = new Date(state.photos[0].created)
    setDate = `${date.toLocaleString('en', {month: 'short'})} ${date.getDate()} ${date.getFullYear()}`

imageSmall = state.photos.map(item => {
    return(
      <div
      className={classes.ImgSmall}
      key={item._links.image_small.href} >

      <img
        src={item._links.image_small.href}
        alt='ph'
        onClick={() => props.history.push('/timeline/' + item.id.toLowerCase())} />
      </div>
    )
  })
}
return (
   <>
     <span>{ setDate }</span>
     <div  className={classes.Imgwrapper}>
      { imageSmall }
     </div>
   </>
)}

export default withRouter(ImgSmall)
