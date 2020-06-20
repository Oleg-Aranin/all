import React, {useReducer} from 'react'
import {AppContext} from './appContext'
import appReducer from './appReducer'
import {
  CHANGE_EDIT_POST,
  CONTENT_EDIT,
  CREAT_NEW_POST,
  CREAT_NEW_POST_CONTENT,
  CHANG_TEXT_COMMENT,
  MODAL_SHOW,
  SET_INDEX_EDIT_POST
} from './types'


export const AppState = ({children}) => {

  let dataStorage = JSON.parse(localStorage.getItem('content'))

  const initialState = {
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
    editor: {
      heder: '',
      shortDescription: '',
      article: '',
    },
    editorIndex: '',

    modalShow: false
   }

  const [state, dispatch] = useReducer(appReducer, initialState)

  function onChangeCreatPostHendler(e, controlName) {

     let creatPost = {...state.creatPost}
     let control = {...creatPost[controlName]}
         control= e.target.value
         creatPost[controlName] = control

       dispatch(creatNewPost(creatPost))
   }

  function creatNewPost(creatPost) {
     return {
       type: CREAT_NEW_POST,
       creatPost
     }
   }

  function submitHendler(e) {
    e.preventDefault()
   }

  function addNewPost() {

     let content = [...state.content, {...state.creatPost}]

     let creatPost = {
       heder: '',
       shortDescription: '',
       article: '',
       wholeArticle: false,
       commentValue: []
     }

   dispatch(creatNewPost(creatPost))
   dispatch(creatNewPostContent(content))
   pushToLocalStorage(content)
   }

  function creatNewPostContent(content) {
     return {
       type: CREAT_NEW_POST_CONTENT,
       content
     }
   }

 function onChangeEditPostHendler(e, controlName) {

     let editor = {...state.editor}
     let control = {...editor[controlName]}
         control= e.target.value
         editor[controlName] = control
         dispatch(ChangeEditPost(editor))
   }

   function ChangeEditPost(editor) {
     return {
       type: CHANGE_EDIT_POST,
       editor
     }
   }

   function editPost() {
     let index = state.editorIndex

     let content = [...state.content]
     let editedContent = {...content[index], ...state.editor}
         content[index] = editedContent

   dispatch(contentEdit(content))
   pushToLocalStorage(content)
   }

   function contentEdit(content) {
     return {
       type: CONTENT_EDIT,
       content
     }
   }

    function pushToLocalStorage(data) {
     localStorage.setItem('content', JSON.stringify(data))
   }

   function delComent(index, index2) {

     let content = [...state.content]

     let objComments = {...content[index]}

     let arrComents = [...objComments.commentValue]

     let newArrComents = arrComents.filter((item, i) => i !== index2)

         objComments.commentValue = [...newArrComents]
         content[index] = objComments

   dispatch(creatNewPostContent(content))
   pushToLocalStorage(content)
   }

   function onChangeHendler(e, controlName) {

     let textComment = {...state.textComment}
     let control = {...textComment[controlName]}
         control= e.target.value
         textComment[controlName] = control

         dispatch(changTextComment(textComment))
   }

   function changTextComment(textComment) {
     return {
       type: CHANG_TEXT_COMMENT,
       textComment
     }
   }

   function addComment(index) {

     let coment = {...state.textComment}
     let content = [...state.content]
     let contentItem = {...content[index], commentValue: [...state.content[index].commentValue, {...coment}]}
         content[index] = contentItem

   let textComment = {
     name: '',
     textValue: ''
   }

   dispatch(creatNewPostContent(content))
   dispatch(changTextComment(textComment))
   pushToLocalStorage(content)
   }



   function hendlerWholeArticle(index) {

     let content = [...state.content]
     let contentItem = {...content[index], wholeArticle: !state.content[index].wholeArticle}
         content[index] = contentItem

   dispatch(creatNewPostContent(content))
   pushToLocalStorage(content)
   }

   function deletePost(index) {

     let newContent = [...state.content]
     let content = newContent.filter((item, i) => i !== index)

   dispatch(creatNewPostContent(content))
   pushToLocalStorage(content)
   }

   function openEditor(index) {

     let items = {...state.content[index]}
     let editor = {
       heder: items.heder,
       shortDescription: items.shortDescription,
       article: items.article
     }
      dispatch(ChangeEditPost(editor))
      dispatch(setIndexEditPost(index))
   }

   function setModalShow() {
     dispatch ({
       type: MODAL_SHOW,
     })
   }

   function setIndexEditPost(index) {
     return {
       type: SET_INDEX_EDIT_POST,
       index
     }
   }


   return (
       <AppContext.Provider value={{
          onChangeHendler, addComment, delComent, deletePost, hendlerWholeArticle,
          onChangeCreatPostHendler, addNewPost, openEditor, onChangeEditPostHendler,
          editPost, state, setModalShow, submitHendler
       }}>
         {children}
       </AppContext.Provider>
     )
}
