import {pushToLocalStorage} from './actionEditorArticle'
import {creatNewPostContent} from './actionCreatArticle'



export function hendlerWholeArticle(index) {
 return  (dispatch, getState) => {


  let content = [...getState().app.content]
  let contentItem = {...content[index], wholeArticle: !getState().app.content[index].wholeArticle}
      content[index] = contentItem

dispatch(creatNewPostContent(content))
pushToLocalStorage(content)
}
}

export function deletePost(index) {
  return  (dispatch, getState) => {


  let newContent = [...getState().app.content]
  let content = newContent.filter((item, i) => i !== index)

dispatch(creatNewPostContent(content))
pushToLocalStorage(content)
}
}
