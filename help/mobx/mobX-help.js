@observable вешаем дикаратор на store
или создаем стор внутри функции
observable({
  count: 0
})

и пробрасывает stor в компонент через props
this.props.store.increment()


========================================================================

const nickName = new class UserNickName {

constructor() {
 extendObservable(this, { (внутри создаем все наблюдаемые свойства и методы. получается один объект в котором инкапсулированна вся логика)
   firsName: 'oleg',
   age: 24
 })
}

==============================================================================

const nickName = observable ({ используем вместо класса объект "наблюдаемый объект", также существует "наблюдаемый массив"
  firsName: 'oleg',
  age: 24,

  get nickName() {
    console.log('gen nickName')
    return `${this.firsName + this.age}`
  },

  increment() { this.age++ },

  decrement() { this.age-- }
})


=======================================================================================


   const todos = observable([  "наблюдаемый массив"
     { text: 'learn react' },
     { text: 'learn mobx' }
   ])

   ================================================================================
   указываем экшкны как второй арументв в функуию observable

   const nickName = observable({
     firsName: 'oleg',
     age: 24,

     get nickName() {
       console.log('gen nickName')
       return `${this.firsName + this.age}`
     },

     increment() { this.age++ },

     decrement() { this.age-- },


   }, {
     increment: action,
     decrement: action
   }
 )

 ====================================================================
 делаем обычный класс и описываем все через функцию decorate

 decorate(Store, {
   devList: observable,
   totalSum: computed,
   clearList: action
 })

 =================================================================
 асинхронные запросы
внутри экшена осуществляем запрос и изменяем наблюдаемое свойство на полученный результат
