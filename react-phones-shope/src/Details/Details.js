import React, {Component} from 'react'
import Allstore from '../store/allstore'
import classes from './Details.module.css'

export default class extends Component {
  state = {
    cat: 'green'
  }
  render() {

  let a =  Allstore.state.mainPage.items.filter(({name}) => this.props.match.params.name === name.toLowerCase()) //перенести влогику в склад

      let b =  a.map((i) => {
          return (

            <div key={i.name} >
            <p>{i.name}  is good phone</p>
            <p>Price: {i.price} rub</p>
            <p>store has {i.insore} items</p>
            </div>
          )
        })







    return (
      <div className={classes.Details}>
      {b}
      </div>
   )
  }
}
