import React, {Component} from 'react'
import './App.css'
import {connect} from 'react-redux'
import Counter from './Counter2'
import {add, sub, addNumber, asyncAdd} from './redux/actions/actions'


 class App extends Component {

  render() {
    return (
      <div className='app'>
       <h1>Счетчик : {this.props.counter}</h1>
       <hr/>
       <button onClick={this.props.onAdd}>добавить 1</button>
       <button onClick={this.props.onSub}>вычесть 1</button>

       <hr/>
       <button onClick={() => this.props.onAddNumber(15)}>добавить 15</button>
       <button onClick={() => this.props.onAddNumber(-30)}>вычесть 30</button>

       <hr/>
       <button onClick={() => this.props.onAsyncAdd(100)}>Async add 100
       </button>


     <Counter/>
      </div>
   )
  }
}

function mapStateToProps(state) {
return {
  counter: state.counter1.counter
}
}

function mapDispatchToProps(dispatch) {
return {
  onAdd: () => dispatch(add()),
  onSub: () => dispatch(sub()),
  onAddNumber: number => dispatch(addNumber(number)),
  onAsyncAdd: number => dispatch(asyncAdd(number))
}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)







//
