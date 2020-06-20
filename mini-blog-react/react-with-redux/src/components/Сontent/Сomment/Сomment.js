import React from 'react'
import './Сomment.css'
import {Form, Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import { submitHendler } from '../../../store/actions/actionCreatArticle'
import {onChangeHendler, addComment} from '../../../store/actions/comment'


function Comment(props) {

  return (
  <Form className="col-sm-8" onSubmit={submitHendler}>
 <Form.Group controlId="exampleForm.ControlInput1">
   <Form.Label>Имя</Form.Label>
   <Form.Control
     type="name"
     value={props.textComment.name}
     onChange={(e) => props.onChangeHendler(e, 'name')}
     />
 </Form.Group>
 <Form.Group controlId="exampleForm.ControlTextarea1">
   <Form.Label>Коментарий</Form.Label>
   <Form.Control
     type="textarea"
      as="textarea"
       rows="3"
        value={props.textComment.textValue}
        onChange={(e) => props.onChangeHendler(e, 'textValue')}
        />
 </Form.Group>
 <Button
    className='Comment-btn'
     type="submit"
     onClick={() => props.addComment(props.index)}
     disabled={!props.textComment.name || !props.textComment.textValue}
     >Оставить коментарий</Button>
</Form>
)}

function mapStateToProps(state) {
  return {
    textComment: state.app.textComment
  }
}

function mapDispatchToProps(dispatch) {
 return {
   onChangeHendler: (e, controlName) => dispatch(onChangeHendler(e, controlName)),
   addComment: (e, controlName) => dispatch(addComment(e, controlName))
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
