import {
  CHANGE_EDIT_POST,
  CONTENT_EDIT,
  CREAT_NEW_POST,
  CREAT_NEW_POST_CONTENT,
  CHANG_TEXT_COMMENT
} from '../actions/actionTypes'

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
  }
 }




export default function appReducer(state = initialState, action) {

switch (action.type) {
  case CHANGE_EDIT_POST:
    return {
      ...state, editor: action.editor
    }
  case CONTENT_EDIT:
    return {
      ...state, content: action.content
    }
  case CREAT_NEW_POST:
    return {
      ...state, creatPost: action.creatPost
    }
  case CREAT_NEW_POST_CONTENT:
    return {
      ...state, content: action.content
    }
  case CHANG_TEXT_COMMENT:
    return {
      ...state, textComment: action.textComment
    }
  default:
    return state
}
}
