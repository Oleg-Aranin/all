//================================ объекты ==================

//======  entries  =====
// возвращает массив собственных перечесляемых свойств объекта
// в формате ключ - значение (унаследованые отображаться не будут)

const user = {
    name: 'oleg',
    lastName: 'ivanov'
}

Object.entries(user) // [[ 'name', 'oleg'], [ 'lastName', 'ivanov ]]

const name = ['y', 'a', 'r', 'u']

Object.entries(name) // [[ '0', 'y' ], [ '1', 'a' ], [ '2', 'r] ....]

//======= fromEntries ===

const arr = [['one', 1], ['two', 2], ['three', 3]]

Object.fromEntries(arr) // { one: 1, two: 2, three: 3 }

//========================  values  ===========
{
    const user = {
        name: 'oleg',
        lastName: 'ivanov'
    }

    Object.values(user) // [ 'oleg', 'ivanov' ]
    console.log(Object.values(user))
}

//=======  Object.getOwnPropertyDescriptors()  =======

const person = {
    name: 'Max',
    age: 30,
    set personName(name) {
        this.name = name
    },
    get password() {
        return `${this.name}${this.age}`
    }
}
console.log(person) //{name: 'Max', age: 30}

console.log(Object.getOwnPropertyDescriptors(person)) // name: {value: "Max", writable: true, enumerable: true, configurable: true}
// age: {value: 30, writable: true, enumerable: true, configurable: true}
//   personName: {get: undefined, enumerable: true, configurable: true, set: ƒ}
//    password: {set: undefined, enumerable: true, configurable: true, get: ƒ}


//=======================================  async   ================================
// ===  all ==
const showText = async () => {
    const [fetchedDescrText, fetchedEsText] = await Promise.all([fetchedDescrText(), fetchedEsText()])

    return `${fetchedDescrText} ${fetchedEsText}`
}

//=================== catch в каждом отдельном await
const show = async () => {
    const etchedText = await fetchText().catch(e => console.log(e))
}

//===================  catch применяем ко всей функции  ========

const show2 = async () => {
    const etchedText = await fetchText()
}

show2()
    .then(console.log('gggggggggg'))// в случае успеха
    .catch(e => console.log(e))

//================== finally ====================
const finally2 = async () => {
    try {

    } catch {

    } finally {

    }
}

//============= async for of ======

const show3 = async () => {
    for await (name of names) {
        console.log(name)
    }
}

//=========== yield async =======

async function read(path) {
    let file = await fileOpen(path)

    try {
        while (!file.EOF) {
            yield await file.read()
        }
    } finally {
        await file.close
    }

    for await (const line of read(filePath)) {
        console.log(loine)
    }
}

//================================ arr ======================================
const arr = [1,2,3,4, 'five', NaN]

//возвращает первый индекс по которому есть совпадение значения или -1 если нет совпадения
 if(arr.indexOf(3)) {
     console.log(true) //true
 }

 //имеется ли в массиме нужный элемент возвращает true or false
 if(arr.includes(3)) {
     console.log(true) //true
 }

 //========= flat, flatMap===
// flat удаляет пустые слоты в массиве
const arr2 = [1, 2, [3, 4]]
arr2.flat() // [1, 2, 3, 4]

const arr3 = [1, 2, [3, 4, [5, 6]]]
arr3.flat() // [1, 2, 3, 4, [5, 6]]

//поднять на два уровня
const arr3 = [1, 2, [3, 4, [5, 6]]]
arr3.flat(2) // [1, 2, 3, 4, 5, 6]

//поднять на все имеющиеся уровни
arr4.flat(Infinity)

const arr7 = [[1], [2], [3], [4]]
arr7.flatMap(x => [x * 2]) // [2, 4, 6, 8]


//============================================= String methods ===================
const str = 'test'

str.padStart(10, '~') // '~~~~~~~~~~~test'
str.padEnd(10, '~') // 'test~~~~~~~~~~'
str.padStart(10) // '         test'
str.padEnd(10) // 'test        '


const str2 = 'Hello, my name is Yauhen'

str2.startsWith('Hello') // true
str2.startsWith('Hi') //false

str2.endsWith('Yauhen') // true
str2.endsWith('Jack') // false

str2.startsWith(my, 7) //true

const str3 = '   Hello, my name is Yauhen  '
str3.trimStart() //'Hello, my name is Yauhen    '
str3.trimEnd() //'   Hello, my name is Yauhen'
str3.trim() //'Hello, my name is Yauhen'

