import React from 'react'
import './Сomment.css'
import {Form, Button} from 'react-bootstrap'

export default props => {

  return (
  <Form className="col-sm-8" onSubmit={props.submitHendler}>
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
     onClick={props.addComment}
     disabled={!props.textComment.name || !props.textComment.textValue}
     >Оставить коментарий</Button>
</Form>
)}
