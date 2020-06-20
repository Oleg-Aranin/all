import React from 'react'
import './Editor.css'
import {Modal, Button} from 'react-bootstrap'
import EditorArticle from './EditorArticle'
import Store from '../../store/store'
import {observer} from 'mobx-react'



export default observer(() => {
  return (
    <Modal
      onHide={Store.setModalShow}
      show={Store.state.modalShow}
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
      <EditorArticle />
      <Button onClick={Store.setModalShow}>Close</Button>
      </Modal.Body>
    </Modal>
  )
}
)
