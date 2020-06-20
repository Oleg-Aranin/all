import React, {Component} from 'react'
import {observable, computed, action, extendObservable } from 'mobx';
import {observer} from 'mobx-react';



class Store {
@observable  user: null

  @action getUser = () => {
   fetch('https://randomuser.me/api/')
   .then(res => res.json())
   .then(json => {
     if (json.results) {
       this.setUser(json.results)
     }
   })
  }

  @action setUser(results) {
    this.user = results[0]
  }
}

const appStore = new Store()

@observer class App extends Component {
  render() {

    return (
      <div>
       <button onClick={appStore.getUser}>Get User</button>
       <h1>{appStore.user ? appStore.user.login.username : 'default'}</h1>
      </div>
    )
  }
}
export default App
