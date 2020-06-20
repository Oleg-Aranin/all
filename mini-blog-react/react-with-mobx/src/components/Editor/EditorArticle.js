import React from 'react'
import {Form, Button } from 'react-bootstrap'
import Store from '../../store/store'
import {observer} from 'mobx-react'


export default observer(() => {

function united() {
 Store.setModalShow()
 Store.editPost()
}

  return (
  <div className='row row justify-content-md-center' fixed="top">
    <div className="col-sm-8">

  <Form >
 <Form.Group controlId="exampleForm.ControlInput1">
   <Form.Label>заголовок статьи</Form.Label>
   <Form.Control
      type="text"
      value={Store.state.edito.heder}
      onChange={(e) => Store.onChangeEditPostHendler(e, 'heder')}
        />
 </Form.Group>
 <Form.Group controlId="exampleForm.ControlSelect1">
   <Form.Label>краткое описание статьи</Form.Label>
   <Form.Control
      type="text"
      value={Store.state.edito.shortDescription}
      onChange={(e) => Store.onChangeEditPostHendler(e, 'shortDescription')}
      >
   </Form.Control>
 </Form.Group>

 <Form.Group controlId="exampleForm.ControlTextarea1">
   <Form.Label>Содержание статьи</Form.Label>
   <Form.Control
      as="textarea"
       rows="3"
       value={Store.state.edito.article}
       onChange={(e) => Store.onChangeEditPostHendler(e, 'article')}
        />
 </Form.Group>
</Form>
<Button
   onClick={united}
   disabled={!Store.state.edito.heder || !Store.state.edito.shortDescription || !Store.state.edito.article}
    >Сохранить </Button >
</div>
</div>
)}
)
