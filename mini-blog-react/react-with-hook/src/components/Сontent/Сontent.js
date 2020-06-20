import React, {useContext} from 'react'
import './Сontent.css'
import {Card, Button} from 'react-bootstrap'
import Comment from './Сomment/Сomment'
import TextComment from './TextComment/TextComment'
import MyVerticallyCenteredModal from '../Editor/Editor'
import {AppContext} from '../../context/appContext'

function Content() {
  const {state, deletePost, hendlerWholeArticle, openEditor} = useContext(AppContext)

let renderContent = state.content.map((item, index) => {

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

     <span className='Content-read' onClick={() => hendlerWholeArticle(index)} >
      {
         item.wholeArticle ? <Button variant="success" >скрыть</Button> : 'читать...'
      }
     </span>

     <span
        className='edit'
        onClick={() => openEditor(index) } > редактировать
     </span>

      <span
         className='delete'
         onClick={() => deletePost(index)} >Удалить пост
      </span>

   </Card.Body>

  </Card>
  )
})

return(
  <>
    <div className='row row justify-content-md-center ' fixed="top">
        <div className="col-sm-8">
      { renderContent.reverse() }
      </div>
    </div>
  <MyVerticallyCenteredModal/>
  </>
)}


export default Content
