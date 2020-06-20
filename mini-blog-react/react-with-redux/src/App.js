import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Content from './components/Сontent/Сontent'
import CreatArticle from './components/CreatArticle/CreatArticle'
import {Route, Redirect} from 'react-router-dom'
import Author from './components/Author/Author'



export default () =>  (
    <div className="container">
        <Navbar />
        <Route path='/' component={Content} exact/>
        <Route path='/creat' component={CreatArticle } />
        <Route path='/author' component={Author}/>
        <Redirect to={'/'}/>
    </div>
  )
