import {
  CHANGE_EDIT_POST,
  CONTENT_EDIT,
  CREAT_NEW_POST,
  CREAT_NEW_POST_CONTENT,
  CHANG_TEXT_COMMENT,
  MODAL_SHOW,
  SET_INDEX_EDIT_POST
} from './types'

const handlers = {
  [CHANGE_EDIT_POST]: (state, {editor}) => ({...state, editor, modalShow: true}),
  [CONTENT_EDIT]: (state, {content}) => ({...state, content}),
  [CREAT_NEW_POST]: (state, {creatPost}) => ({...state, creatPost}),
  [CREAT_NEW_POST_CONTENT]: (state, {content}) => ({...state, content}),
  [CHANG_TEXT_COMMENT]: (state, {textComment}) => ({...state, textComment}),
  [MODAL_SHOW]: (state, {modalShow}) => ({...state, modalShow: false}),
  [SET_INDEX_EDIT_POST]: (state, {index}) => ({...state, editorIndex: index}),
  DEFAULT: state => state
}


export default function appReducer(state, action) {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}
