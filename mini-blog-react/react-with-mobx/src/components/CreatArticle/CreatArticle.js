import React from 'react'
import './CreatArticle.css'
import {Form, Button } from 'react-bootstrap'
import Store from '../../store/store'
import {observer} from 'mobx-react'


export default observer(() => (
  <div className='row row justify-content-md-center' fixed="top">
    <div className="col-sm-8">
  <Form onSubmit={Store.submitHendler}>
 <Form.Group controlId="exampleForm.ControlInput1">
   <Form.Label>заголовок статьи</Form.Label>
   <Form.Control
      type="text"
      value={Store.state.creatPost.heder}
      onChange={(e) => Store.onChangeCreatPostHendler(e, 'heder')}
        />
 </Form.Group>
 <Form.Group controlId="exampleForm.ControlSelect1">
   <Form.Label>краткое описание статьи</Form.Label>
   <Form.Control
      type="text"
      value={Store.state.creatPost.shortDescription}
      onChange={(e) => Store.onChangeCreatPostHendler(e, 'shortDescription')}
      >
   </Form.Control>
 </Form.Group>

 <Form.Group controlId="exampleForm.ControlTextarea1">
   <Form.Label>Содержание статьи</Form.Label>
   <Form.Control
      as="textarea"
       rows="3"
       value={Store.state.creatPost.article}
       onChange={(e) => Store.onChangeCreatPostHendler(e, 'article')}
        />
 </Form.Group>
</Form>
<Button
   type="submit"
   onClick={Store.addNewPost}
   disabled={!Store.state.creatPost.heder || !Store.state.creatPost.shortDescription || !Store.state.creatPost.article}
    >Добавить запись </Button >
</div>
</div>
)
)
