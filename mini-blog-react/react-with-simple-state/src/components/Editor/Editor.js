import React from 'react'
import './Editor.css'
import {Modal, Button} from 'react-bootstrap'
import EditorArticle from './EditorArticle'



function MyVerticallyCenteredModal(props) {


  return (
    <Modal
      onHide={props.onHide}
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Отредактируйте пост
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
      <EditorArticle
       state={props.state}
       onChangeEditPostHendler={props.onChangeEditPostHendler}
       editPost={props.editPost}
       onHide={props.onHide}
      />

      <Button onClick={props.onHide}>Close</Button>
      </Modal.Body>
    </Modal>
  )
}

export default function App(props) {
  const [modalShow, setModalShow] = React.useState(false);

  function setModalShowOpenEditor() {
   setModalShow(true)
   props.openEditor()
  }

  return (
    <>
      <span
       className='edit'
        onClick={ setModalShowOpenEditor }
        >
        редактировать
      </span>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        state={props.state}
        editPost={props.editPost}
        onChangeEditPostHendler={props.onChangeEditPostHendler}
      />
    </>
  )
}
