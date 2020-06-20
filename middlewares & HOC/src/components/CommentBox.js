import React, {Component, useState} from "react";
import {connect} from 'react-redux'
import * as actions from '../actions'
import requireAuth from "./requireAuth";

// const CommentBox = (props) => {
//     const [state, setState] = useState('')
//
//     const handelChange = e => {
//         setState({comment: e.target.value})
//     }
//
//     const handelSubmit = e => {
//         e.preventDefault()
//
//         props.saveComment(state.comment)
//
//         setState({comment: ''})
//     }
//
//
//     return (
//         <div>
//             <form onSubmit={handelSubmit}>
//                 <h4>Add a Comment</h4>
//                 <textarea
//                     onChange={handelChange}
//                     value={state.comment}/>
//                 <div>
//                     <button>Submit Comment</button>
//                 </div>
//             </form>
//             <button className='fetch-comments' onClick={props.fetchComments}>Fetch Comments</button>
//         </div>
//     )
//
// }
//
// function mapStateToProps({auth}) {
//     return {auth}
// }
//
// export default connect(mapStateToProps, actions)(CommentBox)


class CommentBox extends Component {
    state = {comment: ''}


    handelChange = e => {
        this.setState({comment: e.target.value})
    }

    handelSubmit = e => {
        e.preventDefault()

        this.props.saveComment(this.state.comment)

        this.setState({comment: ''})
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handelSubmit}>
                    <h4>Add a Comment</h4>
                    <textarea
                        onChange={this.handelChange}
                        value={this.state.comment}/>
                    <div>
                        <button>Submit Comment</button>
                    </div>
                </form>
                <button className='fetch-comments' onClick={this.props.fetchComments}>Fetch Comments</button>
            </div>
        )
    }
}
export default connect(null, actions)(requireAuth(CommentBox));
