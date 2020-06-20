import React from 'react'
import './Navbar.css'
import {Navbar, Nav} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'

export default props => (
  <div className='row sticky-top' fixed="top" >
    <div className="col-sm-12">
  <header className="App-header">
    <Navbar bg="dark" variant="dark " className='Navbar' >

      <Nav className="mr-auto ">
        <NavLink to="/" className='nav-link' exact >Главная</NavLink>
        <NavLink to="/author" className='nav-link'>Об Авторе</NavLink>
        <NavLink to="/creat" className='nav-link'>Добвить запись</NavLink>
        <Navbar.Text className='Navbar-text'>
              Личный мини-блог
            </Navbar.Text>
      </Nav>
    </Navbar>
  </header>
  </div>
  </div>



)
