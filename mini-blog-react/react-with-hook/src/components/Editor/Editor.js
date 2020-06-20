import React, {useContext} from 'react'
import './Editor.css'
import {Modal, Button} from 'react-bootstrap'
import EditorArticle from './EditorArticle'
import {AppContext} from '../../context/appContext'




export default function MyVerticallyCenteredModal() {
const {state, setModalShow} = useContext(AppContext)
  return (
    <Modal
      onHide={setModalShow}
      show={state.modalShow}
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

      <Button onClick={setModalShow}>Close</Button>
      </Modal.Body>
    </Modal>
  )
}
