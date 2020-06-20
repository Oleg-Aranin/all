import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap'
import DevTools from 'mobx-react-devtools'
import {observable, computed, action, extendObservable } from 'mobx';
import {observer} from 'mobx-react';
import Store2 from './async'


    class Store {
     @observable devList = [
       {name: 'Jacj', sp: 12},
       {name: 'Max', sp: 10},
       {name: 'Leo', sp: 18}
     ]

     @observable filter: ''

     @computed get totalSum() {
       return this.devList.reduce((sum, { sp }) => sum += sp, 0)
     }

     @computed get topPerformer() {
       const maxSp = Math.max(...this.devList.map(({ sp }) => sp))
       return this.devList.find(({ sp, name }) => {
         if ( maxSp === sp) {
           return name
         }
       })
     }

     @computed get filteredDevelopers() {
        const matchesFilter = new RegExp(this.filter, 'i')
        return this.devList.filter(({ name }) => !this.filter || matchesFilter.test(name))
     }

     @action updateFilter(value) {
       this.filter = value
     }




     @action clearList() {
       this.devList = []
     }

     @action addDeveloper(dev) {
       this.devList.push(dev)
     }
   }


   const appStore = new Store()

   const Row = ({ data: { name, sp } }) => {
     return (
       <tr>
        <td>{name}</td>
        <td>{sp}</td>
       </tr>
     )
   }


@observer class Table extends Component {

  render() {

   return (
       <table>
         <thead>
           <tr>
             <td>Name:</td>
             <td>SP:</td>
           </tr>
         </thead>
         <tbody>
           {this.props.store.filteredDevelopers.map((dev, i) => <Row key={i} data={dev} />)}
         </tbody>
         <tfoot>
           <tr>
             <td>Team SP:</td>
             <td>{this.props.store.totalSum}</td>
           </tr>
           <tr>
             <td>Top Performer:</td>
             <td>{this.props.store.topPerformer ? this.props.store.topPerformer.name : ''}</td>
           </tr>
         </tfoot>
       </table>
 		)
}
}

@observer class Controls extends Component {
  addDeveloper = () => {
    const name = prompt('The name:')
    const sp = parseInt(prompt('The story points:'), 10)
    this.props.store.addDeveloper({ name, sp })
  }

  clearList = () => { this.props.store.clearList() }

  filterDevelopers = ({ target: { value }}) => {
    this.props.store.updateFilter(value)
  }

  render() {
    console.log(999)
    return (
      <div className={'controls'}>
        <button onClick={this.clearList}>Clear table</button>
        <button onClick={this.addDeveloper}>Add record</button>
        <input value={this.props.store.filter} onChange={this.filterDevelopers} />
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div>
       <h1>Sprint Board:</h1>
       <Controls store={appStore} />
       <Table store={appStore} />
       <Store2/>
      </div>
    )
  }
}

export default App;
