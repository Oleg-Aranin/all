import React from 'react'
import classes from './MainPage.module.css'
import Input from '../Input/Input'
import Textarea from '../Textarea/Textarea'
import Attach from '../Attach/Attach'
import Btn from '../Btn/Btn'
import Upload from '../Upload/Upload'
import ManageFiles from '../ManageFiles/ManageFiles'
import Store from '../../store/store'
import {observer} from 'mobx-react'



export default observer(() => {

  const inputArray = Object.keys(Store.state.formControls).map((controlName, index) => {
         return (
           index < 5 ?
           <Input
             controlName={controlName}
             key={controlName + index}
           />
         :
         <Textarea
           controlName={controlName}
           key={controlName + index}
         />
         )
       })

  return (
   <div className={classes.MainPage}>

     <div className={classes.label}>
       <p>{Store.state.mainLabel}</p>
     </div>

     <div className={classes.from}>
       {inputArray[0]}
       {inputArray[1]}
     </div>
     <div className={classes.to}>
       {inputArray[2]}
       {inputArray[3]}
     </div>
     <div className={classes.topic}>
      {inputArray[4]}
     </div >
     <div >
      {inputArray[5]}
    </div>

   <Attach />
   <Btn />
   <ManageFiles />
    { Store.state.loadPage ? <Upload /> : null }
   </div>
)}
)
