import {ADD_BLOG_POST, DELETE_BLOG_POST, EDIT_BLOG_POST} from "./types";
import createDataContext from "./createDataContext";


const blogReducer = (state, action) => {
  switch (action.type) {
      case ADD_BLOG_POST:
          return [
              ...state,
              {id: Math.floor(Math.random() * 99999), title: action.payload.tite,  content: action.payload.content}
              ]
      case DELETE_BLOG_POST:
          return state.filter(({id}) => id !== action.payload)
      case EDIT_BLOG_POST:
          return state.map(blogPost => blogPost.id === action.payload.id ? action.payload : blogPost)
      default:
          return state
  }
}

const addBlogPost = dispatch => (tite, content, callback) => {
    dispatch({type: ADD_BLOG_POST, payload: {tite, content}})
    if (callback) {
        callback()
    }
}

const deleteBlogPost = dispatch => id => dispatch({type: DELETE_BLOG_POST, payload: id})

const editBlogPost = dispatch => (id, title, content, callback) => {
    dispatch({type: EDIT_BLOG_POST, payload: {id, title, content}})
    if (callback) {
        callback()
    }
}

export const {Context, Provider} = createDataContext(blogReducer,
    {addBlogPost, deleteBlogPost, editBlogPost},
    [{title: "TEST POST", content: 'TEST CONTENT', id: 1}]
)
