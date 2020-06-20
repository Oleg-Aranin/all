import React from 'react'
import './Editor.css'
import {Modal, Button} from 'react-bootstrap'
import EditorArticle from './EditorArticle'
import {connect} from 'react-redux'
import {openEditor} from '../../store/actions/editor'



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

       index={props.index}
       onHide={props.onHide}
      />

      <Button onClick={props.onHide}>Close</Button>
      </Modal.Body>
    </Modal>
  )
}

function App(props) {
  const [modalShow, setModalShow] = React.useState(false);

  function setModalShowOpenEditor() {
   setModalShow(true)
   props.openEditor(props.index)
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
        index={props.index}
      />
    </>
  )
}


function mapDispatchToProps(dispatch) {
 return {
   openEditor: (index) => dispatch(openEditor(index))
 }
}

export default connect(null, mapDispatchToProps)(App)
