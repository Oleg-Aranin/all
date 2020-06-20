import React from 'react'
import classes from './Congratulation.css'
import Allstore from '../store/allstore'
import {observer} from 'mobx-react';



export default observer(() => {

let props = Allstore.state.validationForm.formControls
  console.log(Allstore.state.validationForm.formControls.email.value)
  return (
    <div>
    <p>{`Поздравляем ${props.name.value}!`}</p>
    <p>Ваш заказ на сумму {Allstore.computedSum()} рублей успешно оформлен!</p>
    <p>Подробности отправлены на Email: {props.email.value}</p>
    <p>Наши менеджеры в ближайшее время свяжутся с Вами по тел: {props.phone.value} </p>
    </div>
  )
})
