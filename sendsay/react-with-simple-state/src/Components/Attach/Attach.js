import React from 'react'
import classes from './Attach.module.css'


export default (props) => (
   <div className={classes.Attach}
     onClick={props.showLoadPage}
     >
     <span>{`${props.sign}  ${props.text}` }</span>
   </div>
)
