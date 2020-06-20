import React from 'react';
import classes from './SendSayCampon.module.css'
import Store from '../../store/store'
import {observer} from 'mobx-react'




export default observer(() => {

let statusLetters = Store.state.responseStatus.map((item, index ) => {

    let stat = ''
    let color = 'black'

   if (item.status === 1) {
     stat = Store.state.table.sended
     color = 'green'
   } else if (item.status < 1) {
     stat = Store.state.table.error
     color = 'red'
   } else if (item.status > 1) {
     stat = Store.state.table.queue
   }

    return (
      <tr key={item.index + item.date}>
      <td>{item.date}</td>
      <td>{item.topic}</td>
      <td><span className={classes[color]}>{stat}</span></td>
      </tr>
    )
  })

    return (
  <div className={classes.SendSayCampon}>
      <h3>{Store.state.table.header}</h3>
      {
        Store.state.responseStatus[0]
        ?
          <table>
              <thead>
                  <tr>
                    <th>{Store.state.table.date}</th>
                    <th>{Store.state.table.topic}</th>
                    <th>{Store.state.table.status}</th>
                  </tr>
              </thead>
              <tbody>
                    {statusLetters}
              </tbody>
         </table>
       :
       <p>{Store.state.table.label}</p>
      }
  </div>
    )

}
)
