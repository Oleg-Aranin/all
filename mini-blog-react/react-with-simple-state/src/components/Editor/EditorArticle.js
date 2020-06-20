import React from 'react'
import {Form, Button } from 'react-bootstrap'


export default props => {

function united() {
 props.onHide()
 props.editPost()
}

  return (
  <div className='row row justify-content-md-center' fixed="top">
    <div className="col-sm-8">

  <Form >
 <Form.Group controlId="exampleForm.ControlInput1">
   <Form.Label>заголовок статьи</Form.Label>
   <Form.Control
      type="text"
      value={props.state.heder}
      onChange={(e) => props.onChangeEditPostHendler(e, 'heder')}
        />
 </Form.Group>
 <Form.Group controlId="exampleForm.ControlSelect1">
   <Form.Label>краткое описание статьи</Form.Label>
   <Form.Control
      type="text"
      value={props.state.shortDescription}
      onChange={(e) => props.onChangeEditPostHendler(e, 'shortDescription')}
      >
   </Form.Control>
 </Form.Group>

 <Form.Group controlId="exampleForm.ControlTextarea1">
   <Form.Label>Содержание статьи</Form.Label>
   <Form.Control
      as="textarea"
       rows="3"
       value={props.state.article}
       onChange={(e) => props.onChangeEditPostHendler(e, 'article')}
        />
 </Form.Group>
</Form>
<Button
   onClick={united}
   disabled={!props.state.heder || !props.state.shortDescription || !props.state.article}
    >Сохранить </Button >
</div>
</div>
)}
