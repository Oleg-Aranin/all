import React, {useContext} from 'react'
import './CreatArticle.css'
import {Form, Button } from 'react-bootstrap'
import {AppContext} from '../../context/appContext'

function CreatArticle() {
  const {state, onChangeCreatPostHendler, submitHendler, addNewPost} = useContext(AppContext)

return (
  <div className='row row justify-content-md-center' fixed="top">
    <div className="col-sm-8">
  <Form onSubmit={submitHendler}>
 <Form.Group controlId="exampleForm.ControlInput1">
   <Form.Label>заголовок статьи</Form.Label>
   <Form.Control
      type="text"
      value={state.creatPost.heder}
      onChange={(e) => onChangeCreatPostHendler(e, 'heder')}
        />
 </Form.Group>
 <Form.Group controlId="exampleForm.ControlSelect1">
   <Form.Label>краткое описание статьи</Form.Label>
   <Form.Control
      type="text"
      value={state.creatPost.shortDescription}
      onChange={(e) => onChangeCreatPostHendler(e, 'shortDescription')}
      >
   </Form.Control>
 </Form.Group>

 <Form.Group controlId="exampleForm.ControlTextarea1">
   <Form.Label>Содержание статьи</Form.Label>
   <Form.Control
      as="textarea"
       rows="3"
       value={state.creatPost.article}
       onChange={(e) => onChangeCreatPostHendler(e, 'article')}
        />
 </Form.Group>
</Form>
<Button
   type="submit"
   onClick={addNewPost}
   disabled={!state.creatPost.heder || !state.creatPost.shortDescription || !state.creatPost.article}
    >Добавить запись </Button >
</div>
</div>
)
}


export default CreatArticle
