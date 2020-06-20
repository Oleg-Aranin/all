import React from 'react'
import './Сomment.css'
import {Form, Button} from 'react-bootstrap'
import Store from '../../../store/store'
import {observer} from 'mobx-react'

export default observer((props) => {

  return (
  <Form className="col-sm-8" onSubmit={Store.submitHendler}>
 <Form.Group controlId="exampleForm.ControlInput1">
   <Form.Label>Имя</Form.Label>
   <Form.Control
     type="name"
     value={Store.state.textComment.name}
     onChange={(e) => Store.onChangeHendler(e, 'name')}
     />
 </Form.Group>
 <Form.Group controlId="exampleForm.ControlTextarea1">
   <Form.Label>Коментарий</Form.Label>
   <Form.Control
     type="textarea"
      as="textarea"
       rows="3"
        value={Store.state.textComment.textValue}
        onChange={(e) => Store.onChangeHendler(e, 'textValue')}
        />
 </Form.Group>
 <Button
    className='Comment-btn'
     type="submit"
     onClick={() => Store.addComment(props.index)}
     disabled={!Store.state.textComment.name || !Store.state.textComment.textValue}
     >Оставить коментарий</Button>
</Form>
)}
)
