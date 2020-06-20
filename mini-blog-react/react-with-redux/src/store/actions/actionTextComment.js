import {pushToLocalStorage} from './actionEditorArticle'
import {creatNewPostContent} from './actionCreatArticle'


export function delComent(index, index2) {
 return  (dispatch, getState) => {


  let content = [...getState().app.content]

  let objComments = {...content[index]}

  let arrComents = [...objComments.commentValue]

  let newArrComents = arrComents.filter((item, i) => i !== index2)

      objComments.commentValue = [...newArrComents]
      content[index] = objComments

dispatch(creatNewPostContent(content))
pushToLocalStorage(content)
}
}
