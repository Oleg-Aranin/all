import React from 'react'
import classes from './Modal.css'
import {Modal, Button, ButtonToolbar, Table} from 'react-bootstrap'
import Allstore from '../../../store/allstore'
import {withRouter} from 'react-router-dom'



 function MyVerticallyCenteredModal(props) {

  const  goToCongratulation = (props) => {
     props.onHide()
     props.props.history.push('/congratulation')
   }

 let items = Allstore.state.cartPage.items
 let details

if (items[0]) {
  details = items.map(item => {
    return (
        <tr key={item.id}>
          <td>{item.name}</td>
          <td>{item.price}</td>
          <td>{item.amount}</td>
          <td>{item.priceAmount()}</td>
        </tr>
      )
  })
}

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">
          Сheck the details of your order
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        {
          details ?(
            <React.Fragment>
        <h4>Your order amount</h4>
          <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Items</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {details}
          </tbody>
        </Table>
        <h3>Sum: {Allstore.computedSum()}</h3>
        </React.Fragment>
      )
          : null
      }


      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => goToCongratulation(props)}>Confirm</Button>
        <Button onClick={() => props.props.history.push('/cart')}>Back to cart</Button>
      </Modal.Footer>
    </Modal>
  );
}

function App(props) {
  const [modalShow, setModalShow] = React.useState(false)
  let disabled = Allstore.state.validationForm.methedDisabled()

  return (
    <ButtonToolbar>
      <Button variant="primary" disabled={!disabled} onClick={() => setModalShow(true) }>
        Send
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        props={props}
      />
    </ButtonToolbar>
  );
}
export default withRouter(App)
