// Создайте блок напишите текст. Добавьте на созданный блок событие dblclick. Сделайте так, чтобы при двойном клике не выделялся текс внутри блока.
let dbCl = document.querySelector('.dblclic');

dbCl.addEventListener('mousedown', function(event) {
  event.preventDefault();
})

dbCl.addEventListener('dblclick', function() {
console.log('dblclick');
});

// Отключите клик правой кнопкой мыши на документе.
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});

// Создайте блок. В качестве фона добавьте изображение закрытой папки. Добавьте событие, чтобы при наведении мыши изображение закрытой папки сменялось изображением открытой папки. При уведении мыши с блока - все возвращалось в исходный вид.
let papka = document.querySelector('.papka');

    papka.addEventListener('mouseover', function() {
      papka.style.left = -100 + '%';
    });
    papka.addEventListener('mouseout', function() {
      papka.style.left = 0;
    });

// Создайте несколько блоков с разными классами. Добавьте событие, чтобы при наведении мыши блок окрашивался в случайный цвет. Для генерации цвета используйте функцию, которая возращает строку вида rgb(23, 45, 66) со случайными числами.

let rappd = document.querySelector('.rappd');

    rappd.addEventListener('mouseover', function(e) {

         let r = randomТumber(0, 256);
             g = randomТumber(0, 256);
             b = randomТumber(0, 256);

          if(e.target.classList == 'div-css') {

            e.target.style.background = `rgb(${r}, ${g}, ${b})`;
          }
    });

    function randomТumber(min, max) {
     return Math.round(Math.random() * (max - min) + min);
 }














//
