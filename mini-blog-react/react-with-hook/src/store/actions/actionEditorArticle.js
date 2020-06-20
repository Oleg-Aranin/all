import {
  CHANGE_EDIT_POST,
  CONTENT_EDIT
} from './actionTypes'




export function onChangeEditPostHendler(e, controlName) {
  return  (dispatch, getState) => {
  let editor = {...getState().app.editor}
  let control = {...editor[controlName]}
      control= e.target.value
      editor[controlName] = control
      dispatch(ChangeEditPost(editor))
}
}

export function ChangeEditPost(editor) {
  return {
    type: CHANGE_EDIT_POST,
    editor
  }
}

export function editPost(index) {
return  (dispatch, getState) => {

  let content = [...getState().app.content]
  let editedContent = {...content[index], ...getState().app.editor}
      content[index] = editedContent

dispatch(contentEdit(content))
pushToLocalStorage(content)
}
}

export function contentEdit(content) {
  return {
    type: CONTENT_EDIT,
    content
  }
}



export function pushToLocalStorage(data) {
  localStorage.setItem('content', JSON.stringify(data))
}
