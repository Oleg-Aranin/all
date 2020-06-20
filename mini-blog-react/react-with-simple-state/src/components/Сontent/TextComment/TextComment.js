import React from 'react'
import {Card} from 'react-bootstrap'
import  './TextComment.css'


export default props => {
 let renderContent = props.comments[props.index].commentValue.map((item, index) => {
  return(
    <Card style={{ width: '100%' }} key={item.name + item.textValue} className='TextComment' >
      <span
         className='del-coment'
         onClick={() => props.delComent(props.index, index)}
         >X</span>
   <Card.Body >
     <Card.Title>{item.name}</Card.Title>

     <Card.Text >
       {item.article}
     </Card.Text>
     <span className='Content-comments'>{item.textValue}</span>
   </Card.Body>
  </Card>
  )
})

return(
  <div className='row row justify-content-md-center' fixed="top">
    <div className="col-sm-8">
  { renderContent }
  </div>
  </div>
)}
