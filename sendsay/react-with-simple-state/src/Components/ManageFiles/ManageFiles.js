import React from 'react'
import classes from './ManageFiles.module.css'

export default (props) => {

const file = props.files.map((item, index) => {
  return (
    <div
     key={item.name + index}
     className={classes.boxFile}
    >
    <div className={classes.boxFileName}>
    📎 { item.name}
  
    </div>
    <div
    className={classes.boxFileDel}
    onClick={id => props.hendlerDeleteFile(item.name)}
    >
    Удалить &#10008;
    </div>
    </div>
  )
})

  return (
   <div className={classes.ManageFiles}>
{file}
   </div>
)}
