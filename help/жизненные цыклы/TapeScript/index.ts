const str: string = 'hello'
console.log(str)

const namberArray: number[] = [1, 2, 4]
const namberArray2: Array<number> = [1, 2, 4]

const concat: [string, number] = ['dfhhg', 123456]

let veriadle: any = 42
    veriadle = 'string'
    veriadle = []

function sayName(name: string): void {
  console.log(name)
}

sayName('j')

//Never - тип 1) указываем когда функция возвращает ошибку и ни когда не заканчивает свое выполнение (постоянно что либуо делает)

function throwError(message: string): never {
      throw new Error(message)
}
function infinite(): never {
      while(true) {}
}

// =======================================создаем свои типы ========================
type Login = string
const login: Login = 'admin'

type ID = string | number
const id1: ID = 5
const id2: ID = 'hi'

// ================== интерфейс ==================================

interface Rect {
  readonly id: string
  color?: string   // вопрос значит не обязательное поле
  size: {
    width: number
    height: number
  }
}

const rect1: Rect = {
  id: '1234',
  size: {
    width: 20,
    height: 30
  },
  color: '#ccc'
}

const rect3 = {} as Rect
const rect4 = <Rect>{}

// =========================== наследование интерфейсов ========
interface RectWithArea extends Rect {
 getArea: () => number  //тип функция и возрашает число
}

const rect5: RectWithArea = {
  id: '1234',
  size: {
    width: 20,
    height: 30
  },
  color: '#ccc',
  getArea(): number {
    return this.size.width * this.size.height
  }
}


// ======================== интерфейс с классами ==========

interface Icloc {
  time: Date
  setTime(date: Date): void
}

class Clock implements Icloc {
   time: Date = new Date()

   setTime(date: Date): void {
     this.time = date
   }
}

// =========== интерфейс для большого объекта========
interface Styles {
 [key: string]: string
}


const css: Styles = {
  border: '1px solid black',
  marginTop: '2px',
  borderRadius: '5px'
}






















//
