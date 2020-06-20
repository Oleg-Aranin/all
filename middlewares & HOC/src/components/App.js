import React from 'react';
import {Route, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import CommentBox from "./CommentBox";
import CommentList from "./CommentList";
import * as actions from '../actions/index'

class App extends React.Component {
    renderHeader() {
        return (
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/post'>Post A Component</Link></li>
                <li>{this.renderButton()}</li>
            </ul>
        )
    }

    renderButton() {
        if (this.props.auth) {
            return <button onClick={() => this.props.changeAuth(false)}>Sing Out</button>
        } else {
            return <button onClick={() => this.props.changeAuth(true)}>Sing In</button>
        }
    }

    render() {


        return (
            <div>
                {this.renderHeader()}
                <Route path='/post' component={CommentBox}/>
                <Route path='/' exact component={CommentList}/>
            </div>
        );
    }
}

function mapStateToProps({auth}) {
    return {auth}
}

export default connect(mapStateToProps, actions)(App)
