import React from 'react'
import './CreatArticle.css'
import {Form, Button } from 'react-bootstrap'
import {connect} from 'react-redux'
import {onChangeCreatPostHendler, submitHendler, addNewPost} from '../../store/actions/actionCreatArticle'

function CreatArticle(props) {
return (
  <div className='row row justify-content-md-center' fixed="top">
    <div className="col-sm-8">
  <Form onSubmit={submitHendler}>
 <Form.Group controlId="exampleForm.ControlInput1">
   <Form.Label>заголовок статьи</Form.Label>
   <Form.Control
      type="text"
      value={props.creatPost.heder}
      onChange={(e) => props.onChangeCreatPostHendler(e, 'heder')}
        />
 </Form.Group>
 <Form.Group controlId="exampleForm.ControlSelect1">
   <Form.Label>краткое описание статьи</Form.Label>
   <Form.Control
      type="text"
      value={props.creatPost.shortDescription}
      onChange={(e) => props.onChangeCreatPostHendler(e, 'shortDescription')}
      >
   </Form.Control>
 </Form.Group>

 <Form.Group controlId="exampleForm.ControlTextarea1">
   <Form.Label>Содержание статьи</Form.Label>
   <Form.Control
      as="textarea"
       rows="3"
       value={props.creatPost.article}
       onChange={(e) => props.onChangeCreatPostHendler(e, 'article')}
        />
 </Form.Group>
</Form>
<Button
   type="submit"
   onClick={props.addNewPost}
   disabled={!props.creatPost.heder || !props.creatPost.shortDescription || !props.creatPost.article}
    >Добавить запись </Button >
</div>
</div>
)
}

function mapStateToProps(state) {
  return {
    creatPost: state.app.creatPost
  }
}

function mapDispatchToProps(dispatch) {
 return {
   onChangeCreatPostHendler: (e, controlName) => dispatch(onChangeCreatPostHendler(e, controlName)),
   addNewPost: () => dispatch(addNewPost())
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatArticle)
