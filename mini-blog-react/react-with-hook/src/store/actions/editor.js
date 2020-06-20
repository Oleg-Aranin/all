import {ChangeEditPost} from './actionEditorArticle'


export function openEditor(index) {
  return  (dispatch, getState) => {

  let items = {...getState().app.content[index]}
  let editor = {
    heder: items.heder,
    shortDescription: items.shortDescription,
    article: items.article
  }

   dispatch(ChangeEditPost(editor))
}
}
