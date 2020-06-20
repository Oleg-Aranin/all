import React from 'react'
import classes from './Congratulation.css'

export default (props) => {
  return (
    <div className={classes.Congratulation}>
    <p>Поздравляем!</p>
    <p>Ваш заказ на сумму {props.amount} рублей успешно оформлен!</p>
    <p>Подробности отправлены на Email: {props.email}</p>
    <p>Наши менеджеры в ближайшее время свяжутся с Вами по тел: {props.phone} </p>
    </div>
  )
}
