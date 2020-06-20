import {CHANG_TEXT_COMMENT} from './actionTypes'
import {pushToLocalStorage} from './actionEditorArticle'
import {creatNewPostContent} from './actionCreatArticle'

export function onChangeHendler(e, controlName) {
  return  (dispatch, getState) => {

  let textComment = {...getState().app.textComment}
  let control = {...textComment[controlName]}
      control= e.target.value
      textComment[controlName] = control

      dispatch(changTextComment(textComment))
}
}
export function changTextComment(textComment) {
  return {
    type: CHANG_TEXT_COMMENT,
    textComment
  }
}

export function addComment(index) {

  
 return  (dispatch, getState) => {

  let coment = {...getState().app.textComment}
  let content = [...getState().app.content]
  let contentItem = {...content[index], commentValue: [...getState().app.content[index].commentValue, {...coment}]}
      content[index] = contentItem

let textComment = {
  name: '',
  textValue: ''
}

dispatch(creatNewPostContent(content))
dispatch(changTextComment(textComment))
pushToLocalStorage(content)
}
}
