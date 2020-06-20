import {CREAT_NEW_POST, CREAT_NEW_POST_CONTENT} from './actionTypes'
import {pushToLocalStorage} from './actionEditorArticle'


export function onChangeCreatPostHendler(e, controlName) {
 return  (dispatch, getState) => {


  let creatPost = {...getState().app.creatPost}
  let control = {...creatPost[controlName]}
      control= e.target.value
      creatPost[controlName] = control

    dispatch(creatNewPost(creatPost))

}
}

export function creatNewPost(creatPost) {
  return {
    type: CREAT_NEW_POST,
    creatPost
  }
}

export function submitHendler(e) {
 e.preventDefault()
}

export function addNewPost() {
 return  (dispatch, getState) => {


  let content = [...getState().app.content, {...getState().app.creatPost}]

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
}


export function creatNewPostContent(content) {
  return {
    type: CREAT_NEW_POST_CONTENT,
    content
  }
}
