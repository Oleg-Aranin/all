import React from 'react';
import classes from './SendSayCampon.module.css'



export default props => {


let statusLetters = props.state.responseStatus.map((item, index ) => {

    let stat = ''
    let color = 'black'

   if (item.status === 1) {
     stat = props.state.table.sended
     color = 'green'
   } else if (item.status < 1) {
     stat = props.state.table.error
     color = 'red'
   } else if (item.status > 1) {
     stat = props.state.table.queue
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
      <h3>{props.state.table.header}</h3>
      {
        props.state.responseStatus[0] ?
        <table>
            <thead>
                <tr>
                  <th>{props.state.table.date}</th>
                  <th>{props.state.table.topic}</th>
                  <th>{props.state.table.status}</th>
                </tr>
            </thead>
            <tbody>
                  {statusLetters}
            </tbody>
       </table>
       :
       <p>{props.state.table.label}</p>
      }


  </div>
    )

}
