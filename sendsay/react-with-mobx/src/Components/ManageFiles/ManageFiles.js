import React from 'react'
import classes from './ManageFiles.module.css'
import Store from '../../store/store'
import {observer} from 'mobx-react'


export default observer(() => {

const file = Store.state.files.map((item, index) => {
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
    onClick={id => Store.hendlerDeleteFile(item.name)}
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
)
