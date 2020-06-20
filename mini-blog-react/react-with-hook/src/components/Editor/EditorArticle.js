import React, {useContext} from 'react'
import {Form, Button } from 'react-bootstrap'
import {AppContext} from '../../context/appContext'


function EditorArticle() {
 const {state, onChangeEditPostHendler, editPost, setModalShow} = useContext(AppContext)

function united() {
 setModalShow()
 editPost()
}

  return (
  <div className='row row justify-content-md-center' fixed="top">
    <div className="col-sm-8">

  <Form >
 <Form.Group controlId="exampleForm.ControlInput1">
   <Form.Label>заголовок статьи</Form.Label>
   <Form.Control
      type="text"
      value={state.editor.heder}
      onChange={(e) => onChangeEditPostHendler(e, 'heder')}
        />
 </Form.Group>
 <Form.Group controlId="exampleForm.ControlSelect1">
   <Form.Label>краткое описание статьи</Form.Label>
   <Form.Control
      type="text"
      value={state.editor.shortDescription}
      onChange={(e) => onChangeEditPostHendler(e, 'shortDescription')}
      >
   </Form.Control>
 </Form.Group>

 <Form.Group controlId="exampleForm.ControlTextarea1">
   <Form.Label>Содержание статьи</Form.Label>
   <Form.Control
      as="textarea"
       rows="3"
       value={state.editor.article}
       onChange={(e) => onChangeEditPostHendler(e, 'article')}
        />
 </Form.Group>
</Form>
<Button
   onClick={united}
   disabled={!state.editor.heder || !state.editor.shortDescription || !state.editor.article}
    >Сохранить </Button >
</div>
</div>
)}

export default EditorArticle
