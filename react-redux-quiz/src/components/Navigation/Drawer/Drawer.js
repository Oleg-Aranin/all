import React, {Component} from 'react'
import classes from './Drawer.css'
import {NavLink} from 'react-router-dom'
import Backdrop from '../../UI/Backdrop/Backdrop'
import {connect} from 'react-redux'




class Drawer extends Component {

  clickHandler = () => {
    this.props.onClose()
  }

  renderLinks(links) {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={classes.active}
            onClick={this.clickHandler}
          >
            {link.label}
          </NavLink>
        </li>
      )
    })
  }

  render() {
    const cls = [classes.Drawer]

    if (!this.props.isOpen) {
      cls.push(classes.close)
    }

    const links = [
      {to: '/', label: this.props.pageDrawer.links, exact: true}
    ]

    if (this.props.isAuthenticated) {
       links.push({to: '/quiz-creator', label: this.props.pageDrawer.creatorLabel, exact: false})
       links.push({to: '/logout', label: this.props.pageDrawer.logoutLabel, exact: false})
    } else {
        links.push({to: '/auth', label: this.props.pageDrawer.authLabel, exact: false},)
    }

    return (
      <React.Fragment>
        <nav className={cls.join(' ')}>
          <ul>
            { this.renderLinks(links) }
          </ul>
        </nav>
        { this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null }
      </React.Fragment>
    )
  }
}


function mapStateToProps(state) {
  return {
   pageDrawer: state.languages.pageDrawer
  }
}

export default connect(mapStateToProps)(Drawer)
