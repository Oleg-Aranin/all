import {observable, action, decorate} from 'mobx'
import Sendsay from '../Components/sendsay/Sendsay1'


class Store {

 state = initialState()

 cleanStateHendler = () => {//don

 Object.keys(this.state.formControls).forEach(item => {
   this.state.formControls[item].value = ''
   this.state.formControls[item].valid = false
   this.state.formControls[item].touched = false
 })

   this.state.isFormValid = false
   this.state.files = []
   this.state.loadPage = false
 }


 sandRequest = () => {//don

   let log = {
    action : "login",
    login  : "89217409387@mail.ru",
    sublogin : "",
    passwd : "vi8Shingo"
   }


   let dataRequest = this.state.formControls
   let fileName = ''


   if (this.state.files[0]) {
   fileName = this.state.files[0].name
   }


   let request = {
     "action" : "issue.send.test",
     "session": "",
     "letter" : {
       "subject" : `${dataRequest.topicOfTheLetter.value}`,
       "from.name" : `${dataRequest.name.value}`,
       "from.email" : `${dataRequest.email.value}`,
       "to.name" : `${dataRequest.nameTo.value}`,
       "message": { "text" : `${dataRequest.text.value}` },
       "attaches": [
                     {
                       "name" : `${fileName}`,
                       "content": `${this.state.files}`,
                       "encoding" : "base64",
                     }
                   ]
     },
     "sendwhen": "test",
     "mca": [
       `${dataRequest.emailTo.value}`,
     ]

   }

 sendRequests()

 let _this = this


 async function sendRequests() {

  let sendsay =  new  Sendsay({ apiUrl: 'https://api.sendsay.ru/clu180' })

  let setLogin = await sendsay.request(log)

  let getTrackId = {...request, session: setLogin.session}

  let getStatus = await sendsay.request(getTrackId)

  let res2 = { "action": "track.get", "id": getStatus["track.id"], "session":  setLogin.session}

  let statusRes = await sendsay.request(res2)

  if(statusRes) {
 let ddd = {
   date: statusRes.obj.dt,
   status: statusRes.obj.status,
   topic: _this.state.formControls.topicOfTheLetter.value
 }

  _this.state.responseStatus.push(ddd)

 _this.cleanStateHendler()

 } else {
   alert('Что то пошло не так. Попробуйте позже')
 }
 }
 }

 showLoadPage = () => {
  this.state.loadPage = true
 }

 closeLoadPage = () => {
  this.state.loadPage = false
 }

 handleDrop = (files, rejectFiles) => {//don

  if (rejectFiles[0]) {
     alert('Такой файл мы не принимаем. Проверьте тип и размер файла')
   }


 let allSizeLetter = [...files, ...this.state.files].reduce((total, {size}) => {
   return total + size
 }, 0)

   if (allSizeLetter <= this.state.detailsFiles.maxSizeLetter) {

   files.forEach(item => this.state.files.push(item))

     this.state.loadPage = false

 } else {
   alert('Слишком большое письмо. Максимум 20 Мб')
 }
 }

 hendlerDeleteFile = id => {
   this.state.files = this.state.files.filter(({name}) => name !== id)
 }


 onChange = (e, controlName) => {//don
   let control = this.state.formControls[controlName]
      control.value = e.target.value
      control.touched = true
      control.valid = this.validateControl(control.value, control.validation)
      this.state.isFormValid = true

      Object.keys(this.state.formControls).forEach(name => {
        this.state.isFormValid = this.state.formControls[name].valid && this.state.isFormValid
      })
 }


 validateControl(value, validation) {
     if (!validation) {
       return true
     }

     let isValid = true

     if (validation.required) {
       isValid = value.trim() !== '' && isValid
     }

     if (validation.email) {
       isValid = validateEmail(value) && isValid
     }

     if (validation.minLength) {
       isValid = value.length >= validation.minLength && isValid
     }

     return isValid
   }


}

decorate(Store, {
  state: observable,
  cleanStateHendler: action,
  sandRequest: action,
  showLoadPage: action,
  closeLoadPage: action,
  handleDrop: action,
  hendlerDeleteFile: action,
  onChange: action
})

export default  new Store();


function initialState() {
  return (
     {
       mainLabel: 'Отправлялка сообщений',
       isFormValid: false,
       formControls: {
           name: {
           value: '',
           type: 'text',
           id: 'name',
           label: 'От кого',
           placeholder: 'Имя',
           errorMessage: 'Имя не может быть менее двух букв ',
           valid: false,
           touched: false,
           validation: {
             required: true,
             minLength: 2
         }
       },
           email: {
           value: '',
           type: 'email',
           id: 'email',
           label: '',
           placeholder: 'Email',
           errorMessage: 'Введите корректный email',
           valid: false,
           touched: false,
           validation: {
             required: true,
             email: true
         }
       },
           nameTo: {
           value: '',
           type: 'text',
           id: 'nameTo',
           label: 'Кому',
           placeholder: 'Имя',
           errorMessage: 'Имя не может быть менее двух букв',
           valid: false,
           touched: false,
           validation: {
             required: true,
             minLength: 2
         }
       },
           emailTo: {
           value: '',
           type: 'email',
           id: 'emailTo',
           label: '',
           placeholder: 'Email',
           errorMessage: 'Введите корректный email',
           valid: false,
           touched: false,
           validation: {
             required: true,
             email: true
         }
       },
       topicOfTheLetter: {
         value: '',
         type: 'text',
         id: 'topicOfTheLetter',
         label: 'Тема письма',
         placeholder: 'Моя тема письма',
         errorMessage: 'Не менее 5 символов',
         valid: false,
         touched: false,
         validation: {
           required: true,
           minLength: 5
       }
    },
    text: {
      value: '',
      type: 'text',
      id: 'text',
      label: 'Сообщение',
      placeholder: 'Введите Ваше сообщение',
      errorMessage: 'Не менее 20 символов',
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 20
    }
   }
   },
   attach: {
     text: 'Прикрепить файл',
     sign: '📎'
   },
   btn: {
     text: 'Отправить'
   },
   files: [],
   detailsFiles: {
     maxSizeFile: 5e+6,
     maxSizeLetter: 5e+6 * 4,
     acceptFiles: ['.jpg', '.png', '.gif', '.doc', '.xls', '.pdf', '.zip']
   },
   loadPage: false,
   responseStatus: [],
   table: {
     header: 'Отправленные сообщения ',
     label: 'Сообщения ещё не отправлялись',
     date: 'Дата',
     topic: 'Тема',
     status: 'Статус',
     sended: 'Отправлено',
     queue: 'В очереди',
     error: 'Ошибка'
   }
   }

  )
}



function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
