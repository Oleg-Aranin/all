import React from 'react'
import s from './ImgSmall.module.css'
import {withRouter} from 'react-router-dom'


function ImgSmall (props) {

let setDate = ''
let imageSmall = ''

if (props.state) {

let date = new Date(props.state[0].created)
    setDate = `${date.toLocaleString('en', {month: 'short'})} ${date.getDate()} ${date.getFullYear()}`

imageSmall = props.state.map(item => {
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

export default withRouter(ImgSmall)
