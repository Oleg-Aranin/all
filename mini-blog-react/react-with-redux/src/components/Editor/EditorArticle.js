import React from 'react'
import {Form, Button } from 'react-bootstrap'

import {connect} from 'react-redux'
import {onChangeEditPostHendler, editPost} from '../../store/actions/actionEditorArticle'

function EditorArticle(props) {

function united() {
 props.onHide()
 props.editPost(props.index)
}

  return (
  <div className='row row justify-content-md-center' fixed="top">
    <div className="col-sm-8">

  <Form >
 <Form.Group controlId="exampleForm.ControlInput1">
   <Form.Label>заголовок статьи</Form.Label>
   <Form.Control
      type="text"
      value={props.editor.heder}
      onChange={(e) => props.onChangeEditPostHendler(e, 'heder')}
        />
 </Form.Group>
 <Form.Group controlId="exampleForm.ControlSelect1">
   <Form.Label>краткое описание статьи</Form.Label>
   <Form.Control
      type="text"
      value={props.editor.shortDescription}
      onChange={(e) => props.onChangeEditPostHendler(e, 'shortDescription')}
      >
   </Form.Control>
 </Form.Group>

 <Form.Group controlId="exampleForm.ControlTextarea1">
   <Form.Label>Содержание статьи</Form.Label>
   <Form.Control
      as="textarea"
       rows="3"
       value={props.editor.article}
       onChange={(e) => props.onChangeEditPostHendler(e, 'article')}
        />
 </Form.Group>
</Form>
<Button
   onClick={united}
   disabled={!props.editor.heder || !props.editor.shortDescription || !props.editor.article}
    >Сохранить </Button >
</div>
</div>
)}

function mapStateToProps(state) {
  return {
    editor: state.app.editor
  }
}

function mapDispatchToProps(dispatch) {
 return {
   onChangeEditPostHendler: (e, controlName) => dispatch(onChangeEditPostHendler(e, controlName)),
   editPost: (index) => dispatch(editPost(index))
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorArticle)
