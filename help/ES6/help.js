//------------------------функции привязка коттекста-------------------------------
nameFanctin.bind(this, `chenged!`) // первый параметер мринимает тот контекст с которым должна быть вызванна функция (this - контекст того места где хранится функция)
nameFanctin.call(this, `chenged!`) // первый параметер мринимает тот контекст с которым должна быть вызванна функция (this - контекст того места где хранится функция)
nameFanctin.apply(this, `chenged!`) // первый параметер мринимает тот контекст с которым должна быть вызванна функция (this - контекст того места где хранится функция)
// через запятую перечесляем как обычно параметры которые хотим передать в функцию



//----------------------------- массивы -----------------------------
Array.from()
Создаёт новый экземпляр Array из массивоподобного или итерируемого объекта.

Array.isArray()
Возвращает true, если значение является массивом, иначе возвращает false.

Array.observe()
Асинхронно наблюдает за изменениями в массиве, подобно методу Object.observe() для объектов. Метод предоставляет поток изменений в порядке их возникновения.

Array.of()
Создаёт новый экземпляр Array из любого количества аргументов, независимо от их количества или типа.

let x = arr.map(item => item*2);
}

arr.forEach(item => {
    console.log(item);
  })

for (let item of arr) {   // в item получаем каждый элемент поочереди
  console.log(item);
}

let findeItem = [1,2,3,4].find(x => x < 3);

cars.push('audi');

cars.pop();

let b = cars.shift();

cars.unshift('apple');

cars.indexOf('hi')


let a = x.getAttribute('type')

let b = x.attributes

x.setAttribute('type', 'abra-kadabra')


let arr = str.split(',');

let arr2 = arr.join('+');

arr.reverse();

arr.splice(1, 2); //Метод splice() изменяет содержимое массива, удаляя существующие элементы и/или добавляя новые.

let newArr = arr.concat(str);

let arr = str.filter(i => i % 2 == 0  )  // на каждой этерацииполучаем переменную i


//------------------------------ объекты ----------------------------
const obj = {
  name,
  age,
  getJob() {
        return 'front End';
    },
  [key + age]: 30
};
const objNew2 = {name, age};

for (let key in obj) {
    console.log(key);
  }

  Object.assign(obj1, obj2)

let obj3 = Object.assign({}, obj1, obj2);

let obj4 = Object.assign({d: 4}, obj1, obj2);

person.family // через точку получаем значение

console.log(person['color']); // в квадратных скобках в строковом формате

// с помощб переменной
let key = 'car';
person[key].year;

let foundPerson = objArr.find(person => person.age == 30 );    //работает как цикл. проходит по всему массиву и его итерирует. возвращает элемент с задаными значениями
}



//----------------------------------- функции -----------------------
const arrow = (x) => 150 * x;
const arrow2 = y => 150 * y;



//----------------------------------деструктуризация----------------

let {name} = objNew;  //имя переменной совпадает с ключем
let {age} = objNew;

let {name, age} = objNew;

let {name: a, age: b} = objNew;



//----------------------------------деструктуризация МАССИВОВ----------------
let [name, age, color] = arr; //такж работает свойство "по умолчанию"


// -------------------------Rest и Spread операторы---------------
let x = (nam, ...args) => {
    console.log(nam, args);
  }
  x(20, 'wtf', 500, 'oleg', 60);

let spredArr = [20, 'wtf', 500, 'oleg', 60];
     console.log('Spread', ...spredArr);


     // -------------------------------- импорт и экспорт -----------------------------
     {
     let name = 'wfm';
     let age = 20;

     export name;
     export age;

     {// или более короткая записать
     export let name = 'wfm';
     export let age = 20;
     }
      import * as extra from './extra.js' // звездачка означает из айла. ./ означает в тойже папке что и мы

      {// или получаем в переменные. в фигурных скобках указываем имена переменных в которые импортирем ои должны совпадать
     import {name, age} './extra.js'
      }
      {// если нужно в опеременнужю с другим названием
        import {name as a} './extra.js'
        }
        {
          let name = 'wfm';
          let age = 20;
          export {
            name: name,
            age: age
          }
     // или короткая записать при совпадении названия ключа и названия значения
     export {
       name,
       age
     }
        }

        {
            export default function fun() {
             console.log(999);
            }
            import fun from './extra.js';


        }
     }

     //-------------------------- генераторы --------------------------
     function* gen() {
       yield 11;
       yield 22;
       yield 33;
       }

       // 2) пример
function* f_get1() {
  yield 1;
  yield* f_gen2(); //говорим иелду что он является генератором
  yield 4;
}
function* f_gen2() {
  yield 2;
  yield 3;
}
// 3) пример
 function* g() {
  yield* [1, 2, 3];
 }

 //.................................. строки ................
 {
  let str = 'hello!';
 console.log('repeat: ', str.repeat(3)); // дублирует строку сколко указанно в скобках

 console.log('StartsWith: ', str.startsWith('l', 2)); // проверяем начинается строка с заданной строки как параметр, вторым параметром можно указать индекс буквы с которой нужно начинать искать

 console.log('Includes: ', str.includes('l')); // можно указать индекс вторым папраметром
 }
str.trim() //удаляет лишние пробелы



//
