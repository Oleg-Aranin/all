import {
  ON_SEARCH_PANEL_CHANGE,
  ON_LABEL_ITEM_CHANGE,
  ON_SUBMIT_CLEAR_LABEL,
  ON_ITEM_ADDED,
  ON_TOGGLE_DONE,
  ON_TOGGLE_IMPORTANT,
  ON_DELETE_ITEM,
  ON_EDIT_ITEM,
  ON_EDIT_TODO_VALUE,
  ON_FILTER_CHANGE,
  ON_SEARCH_CHANGE,
  ON_EDIT_CHANGE
} from './types'

const handlers = {
  [ON_SEARCH_PANEL_CHANGE]: (state, {payload}) => ({...state, searchPanelTerm: payload}),
  [ON_LABEL_ITEM_CHANGE]: (state, {payload}) => ({...state, itemAddFormLabel: payload}),
  [ON_SUBMIT_CLEAR_LABEL]: state => ({...state, itemAddFormLabel: ''}),
  [ON_ITEM_ADDED]: (state, {payload}) => ({...state, items: payload}),
  [ON_TOGGLE_DONE]: (state, {payload}) => ({...state, items: payload}),
  [ON_TOGGLE_IMPORTANT]: (state, {payload}) => ({...state, items: payload}),
  [ON_DELETE_ITEM]: (state, {payload}) => ({...state, items: payload}),
  [ON_EDIT_ITEM]: (state, {payload}) => ({...state, items: payload}),
  [ON_EDIT_TODO_VALUE]: (state, {payload}) => ({...state, items: payload, editTodoItemValue: payload}),
  [ON_FILTER_CHANGE]: (state, {payload}) => ({...state, filter: payload}),
  [ON_SEARCH_CHANGE]: (state, {payload}) => ({...state, search: payload}),
  [ON_EDIT_CHANGE]: (state, {payload}) => ({...state, editTodoItemValue: payload}),
  DEFAULT: state => state
}


export default function appReducer(state, action) {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}
