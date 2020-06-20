import React, {Component} from 'react'
import classes from './Cart.module.css'
import {Table} from 'react-bootstrap'
import Allstore from '../store/allstore'
import {observer} from 'mobx-react';





@observer class Cart extends Component {

  removeItemFromCart(index) {
    Allstore.toggleAdd(index)
    Allstore.listItenInCart()

  }


render () {

let phones = Allstore.state.cartPage.items

let a = phones.map((item) => {
  if (item) {
  return (
    <tr key={item.id + item.name}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.price}</td>
      <td>{item.insore}</td>
      <td>{item.amount}</td>
      <td><button onClick={() => Allstore.amountHandler(item.id -1, 1)}>+</button></td>
      <td><button onClick={() => Allstore.amountHandler(item.id -1, -1)}>-</button></td>
      <td><button onClick={() => this.removeItemFromCart(item.id -1) }>X</button></td>
      <td>{item.priceAmount()}</td>
    </tr>
  )
} 
})


    return (
      <div className={classes.Cart}>
  <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Title</th>
      <th>Price</th>
      <th>amount in store</th>
      <th>amount in cart</th>
      <th>Add</th>
      <th>Subtract</th>
      <th>Revove</th>
      <th>amount</th>
    </tr>
  </thead>
  <tbody>
    {a}

  </tbody>
</Table>
<h4>Sum: {Allstore.computedSum()} rub</h4>
</div>

)
}
}

export default Cart
