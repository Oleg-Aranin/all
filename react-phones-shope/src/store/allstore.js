import {observable, computed, action} from 'mobx';
import is from 'is_js'


class Allstore {
@observable state = getProducts()

@action toggleAdd(index){
  this.state.mainPage.items[index].add = !this.state.mainPage.items[index].add
  this.state.mainPage.items[index].amount = 1
}

@action listItenInCart = () => {
this.state.cartPage.items = this.state.mainPage.items.filter( ({add}) => !add )
}


computedSum() {

  if(this.state.cartPage.items[0]) {
  return this.state.cartPage.items.reduce((total, item) => {
    return total + item.priceAmount()
  }, 0)
}
}


@action amountHandler(index, a) {
  let item = this.state.mainPage.items[index]

    if (    item.amount + a > 0 && item.amount + a <= item.insore ) {
    item.amount += a
  }
}

validateControl = (value, validation) => {
if(!validation) {
  return true
}
let isValid = true

if (validation.required) {
    isValid = value.trim() !== '' && isValid
}

if (validation.email) {
  isValid = is.email(value) && isValid
}

if (validation.minLength) {
  isValid = value.length === validation.minLength && isValid

}



return isValid
}


@action onchangeHandlerForm = (event, controlName) => {

    let control = this.state.validationForm.formControls[controlName]

    control.value = event.target.value
    control.touched = true
    control.valid = this.validateControl(control.value, control.validation)
}

onModalHandler = (e) => {
  e.preventDefault()
this.state.orderPage.modal = true
}

}





export default  new Allstore();

function getProducts(){
    return {
    mainPage: {
            items: [
            {id: 1, name: 'iPhone 2', price: 20000, insore: 6, add: true, amount: 1, priceAmount(){return this.price * this.amount}},
            {id: 2, name: 'iPhone 3', price: 30000, insore: 9, add: true, amount: 1, priceAmount(){return this.price * this.amount}},
            {id: 3, name: 'iPhone 4', price: 40000, insore: 14, add: true, amount: 1, priceAmount(){return this.price * this.amount}},
            {id: 4, name: 'iPhone 5', price: 50000, insore: 5, add: true, amount: 1, priceAmount(){return this.price * this.amount}},
            {id: 5, name: 'iPhone 6', price: 60000, insore: 9, add: true, amount: 1, priceAmount(){return this.price * this.amount}},
            {id: 6, name: 'iPhone 7', price: 70000, insore: 25, add: true, amount: 1, priceAmount(){return this.price * this.amount}},
            {id: 7, name: 'iPhone 8', price: 80000, insore: 3, add: true, amount: 1, priceAmount(){return this.price * this.amount}},
            {id: 8, name: 'iPhone 9', price: 90000, insore: 8, add: true, amount: 1, priceAmount(){return this.price * this.amount}},
            {id: 9, name: 'iPhone X', price: 100000, insore: 11, add: true, amount: 1, priceAmount(){return this.price * this.amount}},
            {id: 10, name: 'iPhone XI', price: 110000, insore: 16, add: true, amount: 1, priceAmount(){return this.price * this.amount}},
            {id: 11, name: 'iPhone XII', price: 120000, insore: 5, add: true, amount: 1, priceAmount(){return this.price * this.amount}}
          ]
        },
    cartPage: {
      items: [false],

    },
    customData: {mail: '', name: '', phone: ''},

    validationForm : {

    isFormValid: false,

    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Please enter a valid email address',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      phone: {
        value: '',
        type: 'text',
        label: 'Phone',
        errorMessage: 'Enter the correct phone number',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 11
        }
      },
      name: {
        value: '',
        type: 'text',
        label: 'Name',
        errorMessage: 'Enter your name',
        valid: false,
        touched: false,
        validation: {
          required: false,
          minLength: null
        }
      }
    },

    methedDisabled() {
      return this.formControls.email.valid && this.formControls.phone.valid && this.formControls.name.value
    },
},
orderPage: {
  modal: false
}
}}
