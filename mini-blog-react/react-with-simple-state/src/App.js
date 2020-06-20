import React, {Component} from 'react'
import Navbar from './components/Navbar/Navbar'
import Content from './components/Сontent/Сontent'
import CreatArticle from './components/CreatArticle/CreatArticle'
import {Route, Redirect} from 'react-router-dom'
import Author from './components/Author/Author'

export default class extends Component {

 state = initialState()

 hendlerWholeArticle = (index) => {

   let content = [...this.state.content]
   let contentItem = {...content[index], wholeArticle: !this.state.content[index].wholeArticle}
       content[index] = contentItem

this.setState({
  content
})
pushToLocalStorage(content)
 }

 submitHendler = (e) => {
   e.preventDefault()
 }

 onChangeHendler = (e, controlName) => {

   let textComment = {...this.state.textComment}
   let control = {...textComment[controlName]}
       control= e.target.value
       textComment[controlName] = control

       this.setState({
         textComment
       })

 }

addComment = (index) => {
  let coment = {...this.state.textComment}
  let content = [...this.state.content]
  let contentItem = {...content[index], commentValue: [...this.state.content[index].commentValue, {...coment}]}
      content[index] = contentItem

let cleanForm = {
  name: '',
  textValue: ''
}

this.setState({
 content,
 textComment: cleanForm
})
pushToLocalStorage(content)
}

onChangeCreatPostHendler = (e, controlName) => {

  let creatPost = {...this.state.creatPost}
  let control = {...creatPost[controlName]}
      control= e.target.value
      creatPost[controlName] = control

      this.setState({
        creatPost
      })

}

onChangeEditPostHendler = (e, controlName) => {

  let edito = {...this.state.edito}
  let control = {...edito[controlName]}
      control= e.target.value
      edito[controlName] = control

      this.setState({
        edito
      })

}


editPost = (index) => {


  let content = [...this.state.content]
  let editedContent = {...content[index], ...this.state.edito}
      content[index] = editedContent

this.setState({
 content,
})
pushToLocalStorage(content)
}


addNewPost = () => {

  let content = [...this.state.content, {...this.state.creatPost}]

  let creatPost = {
    heder: '',
    shortDescription: '',
    article: '',
    wholeArticle: false,
    commentValue: []
  }

this.setState({
 content,
 creatPost
})
pushToLocalStorage(content)
}


deletePost = (index) => {

  let content = [...this.state.content]
  let newContent = content.filter((item, i) => i !== index)

this.setState((state) => {
  return {
    content: newContent
  }
})
pushToLocalStorage(newContent)
}


delComent = (index, index2) => {

  let content = [...this.state.content]

  let objComments = {...content[index]}

  let arrComents = [...objComments.commentValue]

  let newArrComents = arrComents.filter((item, i) => i !== index2)

      objComments.commentValue = [...newArrComents]
      content[index] = objComments

this.setState({
  content
})
pushToLocalStorage(content)
}


openEditor = (index) => {

  let items = {...this.state.content[index]}

  let edito = {
    heder: items.heder,
    shortDescription: items.shortDescription,
    article: items.article
  }

   this.setState({
     edito
   })

}


 render() {

  return (
    <div className="container">

        <Navbar />

      <Route path='/' render={() =>
        <Content
         content={this.state.content}
         hendlerWholeArticle={this.hendlerWholeArticle}
         submitHendler={this.submitHendler}
         textComment={this.state.textComment}
         onChangeHendler={this.onChangeHendler}
         addComment={this.addComment}
         deletePost={this.deletePost}
         delComent={this.delComent}
         state={this.state.edito}
         onChangeEditPostHendler={this.onChangeEditPostHendler}
         editPost={this.editPost}
         openEditor={this.openEditor}
          />
          } exact/>

        <Route path='/creat' render={() =>
          <CreatArticle
            submitHendler={this.submitHendler}
            onChangeCreatPostHendler={this.onChangeCreatPostHendler}
            state={this.state.creatPost}
            addNewPost={this.addNewPost}
             />
         } />
        <Route path='/author' component={Author}/>
        <Redirect to={'/'}/>
    </div>
  );
}
}

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
    heder: 'i',
    shortDescription: 'i',
    article: 'i',
  }
 }
}

let dataStorage = JSON.parse(localStorage.getItem('content'))

function pushToLocalStorage(data) {
  localStorage.setItem('content', JSON.stringify(data))
}
