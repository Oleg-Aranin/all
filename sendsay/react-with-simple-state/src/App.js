import React, {Component} from 'react'
import classes from './App.module.css'
import MainPage from './Components/MainPage/MainPage'
import Sendsay from './Components/sendsay/Sendsay1'
import SendSayCampon from './Components/sendsay/SendSayCampon'


function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

class App extends Component {

 state = initialState()

cleanStateHendler = () => {

  let formControls = {...this.state.formControls}

Object.keys(formControls).forEach(item => {
  let name = {...formControls[item]}
      name.value = ''
      name.valid = false
      name.touched = false
      formControls[item] = name
})

      this.setState({
        formControls,
        isFormValid: false,
        files: [],
        loadPage: false,
      })

}


sandRequest = () => {

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

   let e = [..._this.state.responseStatus]


e.push(ddd)
_this.setState({
  responseStatus:  e

})

_this.cleanStateHendler()

} else {
  alert('Что то пошло не так. Попробуйте позже')
}
}
}

showLoadPage = () => {
  this.setState({
    loadPage: true
  })
}

closeLoadPage = () => {
  this.setState({
    loadPage: false
  })
}

handleDrop = (files, rejectFiles) => {

 if (rejectFiles[0]) {
    alert('Такой файл мы не принимаем. Проверьте тип и размер файла')
  }


let allSizeLetter = [...files, ...this.state.files].reduce((total, {size}) => {
  return total + size
}, 0)

  if (allSizeLetter <= this.state.detailsFiles.maxSizeLetter) {
  const stateFiles = this.state.files
  files.forEach(item => stateFiles.push(item))

  this.setState({
    files: stateFiles,
    loadPage: false
  })

} else {
  alert('Слишком большое письмо. Максимум 20 Мб')
}
}

hendlerDeleteFile = id => {
  const stateFiles = this.state.files
  const files = stateFiles.filter(({name}) => name !== id)
  this.setState({ files })
}


onChange = (e, controlName) => {
let formControls = {...this.state.formControls}
let control = {...formControls[controlName]}
    control.value = e.target.value
    control.touched = true
    control.valid = this.validateControl(control.value, control.validation)

    formControls[controlName] = control

    let isFormValid = true

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })

  this.setState({
    formControls, isFormValid
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


  render() {
    return (
      <div
        className={classes.App}
        >
        <MainPage
          state={this.state}
          onChange={(e, name) => this.onChange(e, name)}
          handleDrop={(files, rejectFiles) => this.handleDrop(files, rejectFiles)}
          hendlerDeleteFile={(id) => this.hendlerDeleteFile(id)}
          showLoadPage={this.showLoadPage}
          closeLoadPage={this.closeLoadPage}
          sandRequest={this.sandRequest}
        />
        <SendSayCampon
        state={this.state}
          />
      </div>
   )
  }
}

export default App

let initialState = () => {
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
