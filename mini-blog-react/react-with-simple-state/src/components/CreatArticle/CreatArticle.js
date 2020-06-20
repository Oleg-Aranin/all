import React from 'react'
import './CreatArticle.css'
import {Form, Button } from 'react-bootstrap'


export default props => (
  <div className='row row justify-content-md-center' fixed="top">
    <div className="col-sm-8">
  <Form onSubmit={props.submitHendler}>
 <Form.Group controlId="exampleForm.ControlInput1">
   <Form.Label>заголовок статьи</Form.Label>
   <Form.Control
      type="text"
      value={props.state.heder}
      onChange={(e) => props.onChangeCreatPostHendler(e, 'heder')}
        />
 </Form.Group>
 <Form.Group controlId="exampleForm.ControlSelect1">
   <Form.Label>краткое описание статьи</Form.Label>
   <Form.Control
      type="text"
      value={props.state.shortDescription}
      onChange={(e) => props.onChangeCreatPostHendler(e, 'shortDescription')}
      >
   </Form.Control>
 </Form.Group>

 <Form.Group controlId="exampleForm.ControlTextarea1">
   <Form.Label>Содержание статьи</Form.Label>
   <Form.Control
      as="textarea"
       rows="3"
       value={props.state.article}
       onChange={(e) => props.onChangeCreatPostHendler(e, 'article')}
        />
 </Form.Group>
</Form>
<Button
   type="submit"
   onClick={props.addNewPost}
   disabled={!props.state.heder || !props.state.shortDescription || !props.state.article}
    >Добавить запись </Button >
</div>
</div>
)
