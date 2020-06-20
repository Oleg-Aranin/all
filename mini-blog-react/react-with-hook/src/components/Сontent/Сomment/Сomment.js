import React, {useContext} from 'react'
import './Сomment.css'
import {Form, Button} from 'react-bootstrap'
import { submitHendler } from '../../../store/actions/actionCreatArticle'
import {AppContext} from '../../../context/appContext'

function Comment(props) {
  const {state, onChangeHendler, addComment} = useContext(AppContext)

  return (
  <Form className="col-sm-8" onSubmit={submitHendler}>
 <Form.Group controlId="exampleForm.ControlInput1">
   <Form.Label>Имя</Form.Label>
   <Form.Control
     type="name"
     value={state.textComment.name}
     onChange={(e) => onChangeHendler(e, 'name')}
     />
 </Form.Group>
 <Form.Group controlId="exampleForm.ControlTextarea1">
   <Form.Label>Коментарий</Form.Label>
   <Form.Control
     type="textarea"
      as="textarea"
       rows="3"
        value={state.textComment.textValue}
        onChange={(e) => onChangeHendler(e, 'textValue')}
        />
 </Form.Group>
 <Button
    className='Comment-btn'
     type="submit"
     onClick={() => addComment(props.index)}
     disabled={!state.textComment.name || !state.textComment.textValue}
     >Оставить коментарий</Button>
</Form>
)}


export default Comment
