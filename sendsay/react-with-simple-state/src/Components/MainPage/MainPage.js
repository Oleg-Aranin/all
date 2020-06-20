import React from 'react'
import classes from './MainPage.module.css'
import Input from '../Input/Input'
import Textarea from '../Textarea/Textarea'
import Attach from '../Attach/Attach'
import Btn from '../Btn/Btn'
import Upload from '../Upload/Upload'
import ManageFiles from '../ManageFiles/ManageFiles'


export default props => {

   let attach = props.state.attach
   let btn = props.state.btn


  const inputArray = Object.keys(props.state.formControls).map((controlName, index) => {
         const control = props.state.formControls[controlName]

         return (
           index < 5 ?
           <Input
             key={controlName + index}
             type={control.type}
             value={control.value}
             valid={control.valid}
             touched={control.touched}
             label={control.label}
             shouldValidate={!!control.validation}
             errorMessage={control.errorMessage}
             placeholder={control.placeholder}
             onChange={e => props.onChange(e, controlName)}
           />
         :
         <Textarea
           key={controlName + index}
           type={control.type}
           value={control.value}
           valid={control.valid}
           touched={control.touched}
           label={control.label}
           shouldValidate={!!control.validation}
           errorMessage={control.errorMessage}
           placeholder={control.placeholder}
           onChange={e => props.onChange(e, controlName)}
         />
         )
       })





  return (
   <div className={classes.MainPage}>

     <div className={classes.label}>
       <p>{props.state.mainLabel}</p>
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



   <Attach
    text={attach.text}
    sign={attach.sign}
    showLoadPage={props.showLoadPage}
   />

   <Btn
     text={btn.text}
     type="primary"
     sandRequest={props.sandRequest}
     disabled={props.state}
   />


     <ManageFiles
       files={props.state.files}
       hendlerDeleteFile={props.hendlerDeleteFile}

      />


    { props.state.loadPage ?
   <Upload
   handleDrop={props.handleDrop}
   state={props.state.detailsFiles}
   closeLoadPage={props.closeLoadPage}
   />
 : null
}

   </div>
)}
