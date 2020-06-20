import React from 'react'
import classes from './Attach.module.css'
import Store from '../../store/store'
import {observer} from 'mobx-react'



export default observer(() => (
   <div className={classes.Attach}
     onClick={Store.showLoadPage}
     >
     <span>{`${Store.state.attach.sign}  ${Store.state.attach.text}` }</span>
   </div>
))
