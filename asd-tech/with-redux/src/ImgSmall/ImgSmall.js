import React from 'react'
import s from './ImgSmall.module.css'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'


function ImgSmall (props) {

let setDate = ''
let imageSmall = ''

if (props.photos) {

let date = new Date(props.photos[0].created)
    setDate = `${date.toLocaleString('en', {month: 'short'})} ${date.getDate()} ${date.getFullYear()}`

imageSmall = props.photos.map(item => {
    return(
      <div
      className={s.ImgSmall}
      key={item._links.image_small.href}
      >

      <img
        src={item._links.image_small.href}
        onClick={() => props.history.push('/timeline/' + item.id.toLowerCase())}
      />
      </div>
    )
  })


}
return (

   <>
     <span>{ setDate }</span>
     <div  className={s.Imgwrapper}>
      { imageSmall }
     </div>
   </>
)}


function mapStateToProps(state) {
  return {
    photos: state.app.photos
  }
}

export default connect(mapStateToProps)(withRouter(ImgSmall))
