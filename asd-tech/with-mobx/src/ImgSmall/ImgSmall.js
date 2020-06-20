import React from 'react'
import s from './ImgSmall.module.css'
import {withRouter} from 'react-router-dom'
import Store from '../store/store'
import {observer} from 'mobx-react'


const ImgSmall = observer((props) => {

let setDate = ''
let imageSmall = ''

if (Store.state.photos) {

let date = new Date(Store.state.photos[0].created)
    setDate = `${date.toLocaleString('en', {month: 'short'})} ${date.getDate()} ${date.getFullYear()}`

imageSmall = Store.state.photos.map(item => {
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
)})

export default withRouter(ImgSmall)
