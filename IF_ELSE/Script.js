// 1. Игра Угадай число
document.addEventListener("DOMContentLoaded", function() {
 let a = Math.round(Math.random() * 10);

 let but = document.getElementById('but'),
     input = document.getElementById('input');

     but.onclick = function() {
      let b = input.value;

      if (b == '' || isNaN(b) || b < 0 || b > 10) {
        alert('введите число от 0 до 10');
      } else {
        if (b == a) {
          alert('поздравляем вы выиграли!!!');
          window.location.reload();
        } else {
           if(b > a) {
             alert('ваше число болше');
           } else {
             alert('ваше число меньше');
           }
        }
      }
     }
})

// 2. кнопка с попытками

let butJS = document.querySelector('#but-js');
let a = 0;
let b = 2;

butJS.onclick = function() {
 butJS.innerText = "Не нажимать";
 alert(`количество оставшихся попыток - ${b--}`);

 a++
 if (a >= 3) {
   butJS.style.display = 'none';
 }
}

// что больше.

let button = document.querySelector('#js-but-2');


   button.onclick = function() {
     let input_1 = document.querySelector('#js-input').value,
         input_2 = document.querySelector('#js-input-2').value;

        if(input_1 == input_2) {
          alert('в JS это равные значения');
        }
    else if (input_1 > input_2) {
      alert(`в JS ${input_1} больше чем ${input_2}`);
    } else {
      alert(`в JS ${input_2} болше чем ${input_1}`);
    }
}

// знак зодиака

// let butSine = document.querySelector('#js-sine-but');
// butSine.onclick = function() {
// let manth = document.querySelector('#js-sine').value,
//     day = document.querySelector('#js-sine-2').value;
//
// if(((manth > 0 && manth <= 12) || (manth == 'январь' || manth == 'февраль' || manth == 'март' || manth == 'апрель' || manth == 'май' || manth == 'июнь' || manth == 'июль' || manth == 'август' || manth == 'сентябрь' || manth == 'октябрь' || manth == 'декабрь')) && (day > 0 && day <= 31)) {
//
//     if(((manth == 'март' || manth == 3) && (day >= 21 && day <=31)) || ((manth == 'апрель' || manth == 4) && (day > 0 && day <=19))) {
//       alert('овен');
//     }
//     if(((manth == 'апрель' || manth == 4) && (day >= 20 && day <=30)) || ((manth == 'май' || manth == 5) && (day > 0 && day <=20))) {
//       alert('телец');
//     }
//     if(((manth == 'май' || manth == 5) && (day >= 21 && day <=31)) || ((manth == 'июнь' || manth == 6) && (day > 0 && day <=20))) {
//       alert('близнецы');
//     }
//     if(((manth == 'июнь' || manth == 6) && (day >= 21 && day <=30)) || ((manth == 'июль' || manth == 7) && (day > 0 && day <=22))) {
//       alert('рак');
//     }
//     if(((manth == 'июль' || manth == 7) && (day >= 23 && day <=31)) || ((manth == 'август' || manth == 8) && (day > 0 && day <=22))) {
//       alert('лев');
//     }
//     if(((manth == 'август' || manth == 8) && (day >= 23 && day <=31)) || ((manth == 'сентябрь' || manth == 9) && (day > 0 && day <=22))) {
//       alert('дева');
//     }
//     if(((manth == 'сентябрь' || manth == 9) && (day >= 23 && day <=30)) || ((manth == 'октябрь' || manth == 10) && (day > 0 && day <=22))) {
//       alert('весы');
//     }
//     if(((manth == 'октябрь' || manth == 10) && (day >= 23 && day <=31)) || ((manth == 'ноябрь' || manth == 11) && (day > 0 && day <=21))) {
//       alert('скорпион');
//     }
//     if(((manth == 'ноябрь' || manth == 11) && (day >= 22 && day <=30)) || ((manth == 'декабрь' || manth == 12) && (day > 0 && day <=21))) {
//       alert('стрелец');
//     }
//     if(((manth == 'декабрь' || manth == 12) && (day >= 22 && day <=31)) || ((manth == 'январь' || manth == 1) && (day > 0 && day <=19))) {
//       alert('козерог');
//     }
//     if(((manth == 'январь' || manth == 1) && (day >= 20 && day <=31)) || ((manth == 'февраль' || manth == 2) && (day > 0 && day <=18))) {
//       alert('водолей');
//     }
//     if(((manth == 'февраль' || manth == 2) && (day >= 19 && day <=28 || day == 29)) || ((manth == 'март' || manth == 3) && (day > 0 && day <=20))) {
//       alert('рыба');
//     }
//   } else {
//     alert('введите корректые данные');
//   }
// }

// знак года

let butChin = document.querySelector('#js-chin-but');

    butChin.onclick = function() {
     let input = document.querySelector('#js-chin-2').value;

     let a = input % 12;

     switch (a) {
     case 1: alert( 'петух' );
       break;
     case 2: alert( 'собака' );
       break;
     case 3: alert( 'свинья' );
       break;
     case 4: alert( 'крыса' );
         break;
     case 5:alert( 'бык' );
         break;
     case 6:alert( 'тирг' );
         break;
     case 7: alert( 'кролик' );
       break;
     case 8: alert( 'дракон' );
       break;
     case 9: alert( 'змея' );
       break;
     case 10: alert( 'лошадь' );
         break;
     case 11:alert( 'коза' );
         break;
     case 12:alert( 'обезьяна' );
         break;

    default: alert( 'введите корректые данные' );
}
    }




// гороскоп второй способ

let butSine = document.querySelector('#js-sine-but'),
    man_1 = ['январь', "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"],
    colDayInManth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    sine = ["водолей", "рыба", "овен", "телец", "близнецы", "рак", "лев", "дева", "весы", "скорпион", "стрелец", "козерог"]
    dedLine = [20, 19, 21, 20, 21, 21, 23, 23, 23, 23, 22, 22];


butSine.addEventListener('click', function() {

  let manth = document.querySelector('#js-sine').value,
      day = document.querySelector('#js-sine-2').value,
      a = 0;

  for (var i = 0; i < man_1.length; i++) {

    if ( ( (man_1[i] == manth) || (i == manth - 1) ) && ( (day >= dedLine[i]) && (day <= colDayInManth[i]) ) ) {
      alert(sine[i]);
      a += 1;
    } else if ( ( (man_1[i] == manth) || (i == manth - 1) ) && ( (day <= dedLine[i]) && (day > 0) ) ) {

        a += 1;
        if (i - 1 < 0) {
          i = man_1.length - 1;
          alert( sine[i])
        } else {
          alert( sine[i -1]);
        }

    } else if (i == man_1.length - 1 && a == 0)
    alert("введите корректыне данные");
    }
  }
);













//
