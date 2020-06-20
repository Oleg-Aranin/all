// 1. Выведите на экран числа от 0 до 100.

for (let i = 0; i <= 100; i++) {
    console.log(i);
  }

//   // 2. Вывести четные числа от 0 до 101.
  for (let i = 0; i <= 101; i++) {
    if( !(i % 2) ) {
      console.log( i );
    }
    }
//
// // 3. Вывести числа в следущей последовательности: 200 199 198 ... 0.

  for (let i = 200; i >= 0; i--) {
     console.log(i);
    }

    // 4. Найти сумму чисел от 0 до 100 (включительно). (0+1+2+3+4+5).
    let a = 0;
    for (let i = 0; i <= 100; i++) {
       a += i;
       console.log(a);
      }

// 5. Задайте два input. В первый вводится число, во второе его степень. С помощью цикла возведите число в степень. Напечатайте результат.
  let but = document.querySelector('button');

    but.addEventListener('click', function() {
      let number = +document.querySelectorAll('.power')[0].value,
          power = +document.querySelectorAll('.power')[1].value,
          equal = document.querySelector('p'),
          a = 1;

           for (let i = 0; i <= power - 1; i++) {
            a = a * number;
            }
            equal.innerText = a;
    });
//     // 6. С помощью цикла напечатайте таблицу умножения на 7 от 1 до 9.

    let multipl = document.querySelector('.multipl');

    multipl.addEventListener('click', function() {

      let div = document.querySelector('.div-multipl');

      for (let i = 1; i <= 9; i++) {
        let table = document.createElement('p');
    table.innerText = `7 x ${i} = ${7*i}`;

    div.appendChild(table);
        }
    });

// // 7. С помощью цикла вывести произведение чисел от 1 до 50.
let a1 = 1;
  for (let i = 1; i <= 50; i++) {
     a1 = a1 * i;
    }
console.log(a);

// // 8. Выведите с помощью цикла коды спецсимволов от 1000 до 2000. Напомню, что спецсимвол получается комбинацией &#число; Например &#1222;
for (let i = 1000; i <= 2000; i++) {
   let sine = '&#' + i;
   console.log(sine);
  }
// 9. Получите все параграфы внутри div.main страницы. Используя цикл пронумеруйте все параграфы. Номер добавьте внутри тега параграфа перед текстом.

let butP = document.querySelector('.but-main');

butP.addEventListener('click', function() {
    let p = document.querySelectorAll('.main p');
    p.forEach ((item, i, r) => {
      item.insertAdjacentHTML('afterBegin', ++i + '. ');
    } )
});

// 10. Создайте два поля. В одно пользователь вводит день рождения, во второй - месяц (в виде числа). Выведите знак зодиака под каким родился пользователь. Данные о знаке зодиака храните в массиве.

let butSine = document.querySelector('.but-sine');

butSine.addEventListener('click', function() {
  let nameSine = ['Водолей', 'Рыбы', 'Овен', 'Телец', 'Близнецы', 'Рак', 'Лев', 'Дева', 'Весы', 'Скорпион', 'Стрелец', 'Козерог']

   let manth = +document.querySelectorAll('.sine input')[1].value,
       day = +document.querySelectorAll('.sine input')[0].value,
       text = document.querySelector('.text'),
       colDayInManth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

       let sum = 0;
       for (let i = 0; i < manth - 1; i++) {
          sum = sum + colDayInManth[i];

         }
         let a = sum + day;
         let index;

         if (a >= 20 && a <= 49 ) {
            index = 0;
         }
         if (a > 49 && a <= 79 ) {
            index = 1;
         }
         if (a > 79 && a <= 109 ) {
            index = 2;
         }
         if (a > 109 && a <= 140 ) {
            index = 3;
         }
         if (a > 140 && a <= 171 ) {
            index = 4;
         }
         if (a > 171 && a <= 203 ) {
            index = 5;
         }
         if (a > 203 && a <= 234 ) {
            index = 6;
         }
         if (a > 234 && a <= 265 ) {
            index = 7;
         }
         if (a > 265 && a <= 295 ) {
            index = 8;
         }
         if (a > 295 && a <= 325 ) {
            index = 9;
         }
         if (a > 325 && a <= 355 ) {
            index = 10;
         }
         if (a > 355 && a < 366 || a <= 19 && a > 0 ) {
            index = 11;
         };

         if(nameSine[index]) {
         text.innerText = nameSine[index];
       }
});

// 11. С помощью JS найдите все span на странице и сделайте им цвет фона - желтый.

let butSpan = document.querySelector('.js-span button');

butSpan.addEventListener('click', function() {
  let span = document.querySelectorAll('.js-span span');

  span.forEach((item) => {
    item.style.background = 'yellow';
  })
});

// Выведите внизу страницы информацию о количестве параграфов.

let sumP = document.querySelectorAll('p').length,
    textSum = document.querySelector('body');
    textSum.insertAdjacentHTML('beforeEnd', sumP);

// 13. Создайте массив состояний из единицы и 5 нулей. Т.е. [1, 0,0,0,0,0]. Выведите массив на страницу. Добавьте кнопку. При каждом нажатии кнопки смещайте единицу вправо на одну позицию и заново выводите массив в тот же блок что и раньше. Если единица достигла конца массива - не делайте ничего.

let arr = [1, 0,0,0,0,0],
    butArr = document.querySelector('.but-arr'),
    click = 0,
    divArr = document.querySelector('.div-arr');
    divArr.innerText = arr;

   butArr.addEventListener('click', function() {
     click++;

     for (let i = 0; i < arr.length; i++) {

        if(click == i) {
          arr[i] = 1;
          divArr.innerText = arr;
        } else {
          arr[i] = 0;
        }
       }

   });

// 14. Создайте массив с произвольными числами. Выведите количество элементов массива меньше нуля.

let arrey = [0, 10, -10, 55, -7, 9, -45],
    s = 0;

    for (let i = 0; i < arrey.length; i++) {
        if(arrey[i] < 0) {
          s++;
        }

      }
    console.log(s);

    // 15. Создайте массив с произвольными числами. Выведите элементы массива меньше нуля.
    let arr_minus = [];
   for (let i = 0; i < arrey.length; i++) {
        if(arrey[i] < 0) {
          arr_minus.push(arrey[i]);
        }
     }
  console.log(arr_minus);

// 16. Создайте input куда пользователь может ввести количество элементов массива. После нажатия кнопки создается массив заданной длинны заполненный единицами.

let lengt = document.querySelector('.but-length');

lengt.addEventListener('click', function() {
  sun = document.querySelector('.length').value,
  div = document.querySelector('.div-length'),
  newarr = [];

  for (let i = 0; i < sun; i++) {
    newarr.push(1);
    }
    div.innerText = newarr;
});

// 17. Создайте input куда пользователь может ввести количество элементов массива. После нажатия кнопки создается массив заданной длинны заполненный случайными числами от 0 до 100.
let randomBUT = document.querySelector('.but-random');

randomBUT.addEventListener('click', function() {

  sun = document.querySelector('.random').value,
  div = document.querySelector('.div-random'),
  newarr = [];

  function rN(min, max) {
    return Math.random() * (max - min) + min;
}

  for (let i = 0; i < sun; i++) {

    newarr.push(Math.round( rN(0, 101) ) );
    }
    div.innerText = newarr;
});

// 18. Создайте массив заполненный числами и строками. Используя цикл создайте другой массив куда поместите только числа из первого массива.

let sNn = [0, 10, -10, 55, -7, 9, -45, 'gggg', 'iuyfghj', '8888', 'yg6j99', 90],
   arrN = [];

  for (let i = 0; i < sNn.length; i++) {
       if(typeof(sNn[i]) == "number") {
          arrN.push(sNn[i]);
       }
    }
console.log(arrN);

// 19. Создайте массив. Выведите максимальное значение из этого массива.

let arrMax =  [0, 10, -10, 55, -7, 9, -45, 90, 10, 10, 10, 55, 80, 0, 500,],
    aa = 0;

 for (let i = 0; i < arrMax.length; i++) {

         for (let j = i; j < arrMax.length; j++) {
             if(arrMax[i] > arrMax[j]) {
               aa = arrMax[i];
               arrMax[i] = arrMax[j];
               arrMax[j] = aa;
             }
           }
   }
console.log(arrMax[arrMax.length - 1]);

// 20! Сложное! Создайте массив и заполните его значениеми. Выведите статистику - сколько раз в массиве повторяется то или инное значение.

let arrFirst = [7, 9, 8, 9, 7, 8, 9, 8, -8, 7, 66, 54, 'привет', 'привет', 'привет', 'привет', 'привет', 'привет', 56, 7, -6, 45, 'age', 'age', 'age'];
let arrSecond = [];

for (let a = 0; a < arrFirst.length; a++) {
arrSecond.push(arrFirst[a]);
let b = 1;

for (let i = a + 1; i < arrFirst.length; i++) {
    if(arrSecond[a] == arrFirst[i]) {
        ++b;
        delete arrFirst[i]
}

} if( arrSecond[a] ) {

 console.log(`${arrSecond[a]} в массиве повторяется ${b} раза`);
}
}
// тоже второй способ


let arrTest = [7, 9, 8, 9, 7, 8, 9, 8, -8, 7, 66, 54, 'привет', 'привет', 'привет', 'привет', 'привет', 'привет', 56, 7, -6, 45, 'age', 'age', 'age'];

let arrResult = {};

for (let i = 0; i < arrTest.length; i++) {
    if(arrResult[arrTest[i]] == undefined) {
      arrResult[arrTest[i]] = 1;
    } else {
      arrResult[arrTest[i]]++;
    }
  }
console.log(arrResult);















// //
