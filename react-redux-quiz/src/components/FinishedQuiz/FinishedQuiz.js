import React from 'react'
import classes from './FinishedQuiz.css'
import Button from '../UI/Button/Button'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'


const FinishedQuiz = props => {
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === 'success') {
      total++
    }

    return total
  }, 0)


  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        { props.quiz.map((quizItem, index) => {
          const cls = [
            'fa',
            props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
            classes[props.results[quizItem.id]]
          ]

          return (
            <li
              key={index}
            >
              <strong>{index + 1}</strong>.&nbsp;
              {quizItem.question}
              <i className={cls.join(' ')} />
            </li>
          )

        }) }
      </ul>

      <p>{props.pageFinishedQuiz.lable} {successCount} {props.pageFinishedQuiz.lable2}  {props.quiz.length}</p>

      <div>
        <Button onClick={props.onRetry} type="primary">{props.pageFinishedQuiz.btn1}</Button>
        <Link to="/">
          <Button type="success">{props.pageFinishedQuiz.btn2}</Button>
        </Link>
      </div>
    </div>
  )
}


function mapStateToProps(state) {
  return {
   pageFinishedQuiz: state.languages.pageFinishedQuiz
  }
}



export default connect(mapStateToProps)(FinishedQuiz)
