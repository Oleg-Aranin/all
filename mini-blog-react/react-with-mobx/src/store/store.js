import {observable, action, decorate} from 'mobx'

let dataStorage = JSON.parse(localStorage.getItem('content'))

class Store {
 state = initialState()

 hendlerWholeArticle = (index) => {
   this.state.content[index].wholeArticle = !this.state.content[index].wholeArticle
   pushToLocalStorage(this.state.content)
 }

 submitHendler = (e) => {
   e.preventDefault()
 }

 onChangeHendler = (e, controlName) => {
   this.state.textComment[controlName] = e.target.value
 }

addComment = (index) => {

let cleanForm = {
  name: '',
  textValue: ''
}

this.state.content[index] = {...this.state.content[index], commentValue: [...this.state.content[index].commentValue, {...this.state.textComment}]}
this.state.textComment = cleanForm
pushToLocalStorage(this.state.textComment)
}

onChangeCreatPostHendler = (e, controlName) => {
  this.state.creatPost[controlName] = e.target.value
}

onChangeEditPostHendler = (e, controlName) => {
  this.state.edito[controlName] = e.target.value
}


editPost = () => {
  let index = this.state.editorIndex
  this.state.content[index] = {...this.state.content[index], ...this.state.edito}
  pushToLocalStorage(this.state.content)
}


addNewPost = () => {
  this.state.content = [...this.state.content, {...this.state.creatPost}]

  let creatPost = {
    heder: '',
    shortDescription: '',
    article: '',
    wholeArticle: false,
    commentValue: []
  }
 this.state.creatPost = creatPost
 pushToLocalStorage(this.state.content)
}


deletePost = (index) => {
  this.state.content = this.state.content.filter((item, i) => i !== index)
  pushToLocalStorage(this.state.content)
}


delComent = (index, index2) => {
 this.state.content[index].commentValue = this.state.content[index].commentValue.filter((item, i) => i !== index2)
 pushToLocalStorage(this.state.content)
}


openEditor = (index) => {
  this.state.edito = this.state.content[index]
  this.state.modalShow = true
  this.state.editorIndex = index
}

setModalShow = () => {
  this.state.modalShow = false
}

}

decorate(Store, {
  state: observable,
  hendlerWholeArticle: action,
  onChangeHendler: action,
  addComment: action,
  onChangeCreatPostHendler: action,
  onChangeEditPostHendler: action,
  editPost: action,
  addNewPost: action,
  deletePost: action,
  delComent: action,
  openEditor: action,
  setModalShow: action,
})

export default  new Store()



function initialState() {
 return {
  content: dataStorage || [],

  textComment: {
    name: '',
    textValue: ''
  },
  creatPost: {
    heder: '',
    shortDescription: '',
    article: '',
    wholeArticle: false,
    commentValue: []
  },

  edito: {
    heder: '',
    shortDescription: '',
    article: '',
  },
  editorIndex: '',


  modalShow: false
}

}



function pushToLocalStorage(data) {
  localStorage.setItem('content', JSON.stringify(data))
}
