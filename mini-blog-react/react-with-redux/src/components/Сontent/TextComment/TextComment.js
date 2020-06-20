import React from 'react'
import {Card} from 'react-bootstrap'
import  './TextComment.css'
import {connect} from 'react-redux'
import {delComent} from '../../../store/actions/actionTextComment'


function TextComment(props) {

 let renderContent = props.content[props.index].commentValue.map((item, index) => {
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

function mapStateToProps(state) {
  return {
    content: state.app.content
  }
}

function mapDispatchToProps(dispatch) {
 return {
   delComent: (index1, index2) => dispatch(delComent(index1, index2))
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextComment)
