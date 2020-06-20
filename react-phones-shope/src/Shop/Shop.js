import React, {Component} from 'react'
import {Table, Button} from 'react-bootstrap'
import Allstore from '../store/allstore'
import {observer} from 'mobx-react';
import classes from './Shop.module.css'


@observer class Items extends Component {
render (props) {


let phones = Allstore.state.mainPage.items.map((item, index) => {
  return (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.price}</td>
      <td>
        <Button
           variant={Allstore.state.mainPage.items[index].add ? "success Shop" : "warning Shop"}
           onClick={() => Allstore.toggleAdd(index)}
           >{Allstore.state.mainPage.items[index].add ? 'add to cart' : 'revove'}
        </Button>
      </td>

      <td>
        <Button
           variant='light Shop'
           className={classes.Shop}
           onClick={() => this.props.history.push('/' + item.name.toLowerCase())}



           >see details
        </Button>
      </td>
    </tr>
  )
})

  return (
    <div className={classes.tablCentre}>
    <Table striped bordered hover variant="dark" >
  <thead>
    <tr>
      <th>#</th>
      <th>Title</th>
      <th>Price</th>
      <th>Add to cart</th>
      <th>Details</th>
    </tr>
  </thead>
  <tbody>
{phones}


  </tbody>
</Table>
</div>
  )
}
}

export default Items
