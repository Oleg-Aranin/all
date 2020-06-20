import React from 'react'
import './Сontent.css'
import {Card, Button} from 'react-bootstrap'
import Comment from './Сomment/Сomment'
import TextComment from './TextComment/TextComment'
import Editor from '../Editor/Editor'
import {connect} from 'react-redux'
import {deletePost, hendlerWholeArticle} from '../../store/actions/content'

function Content(props) {

let renderContent = props.content.map((item, index) => {

  let style = item.wholeArticle ? 'Content-text-show' : 'Content-text'

  return(

    <Card className='Content'  key={item.heder + item.shortDescription + index}>
   <Card.Body>
     <Card.Title>{item.heder}</Card.Title>
     <Card.Subtitle className="mb-2 text-muted">{item.shortDescription}</Card.Subtitle>
     <Card.Text className={style}>
       {item.article}
     </Card.Text>

     { item.wholeArticle
       ?
           <>
           <TextComment index={index} />
           <Comment index={index} />
           </>
       :   null
     }

     <span className='Content-comments'>комментариев {item.commentValue.length}</span>
     <span className='Content-read'
      onClick={() => props.hendlerWholeArticle(index)}
      >{ item.wholeArticle ? <Button variant="success" >скрыть</Button> : 'читать...'}
      </span>
        <Editor index={index} />
         <span
         className='delete'
         onClick={() => props.deletePost(index)}
          >Удалить пост</span>

   </Card.Body>

  </Card>
  )
})

return(
  <div className='row row ' fixed="top">
    <div className="col-sm-8">
  { renderContent }
  </div>

  </div>
)}

function mapStateToProps(state) {
  return {
    content: state.app.content
  }
}

function mapDispatchToProps(dispatch) {
 return {
   deletePost: (index) => dispatch(deletePost(index)),
   hendlerWholeArticle: (index) => dispatch(hendlerWholeArticle(index))
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content)
