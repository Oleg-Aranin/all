

// Задача 2. Создайте один блок внутри другого. На внутренний блок добавьте возможность сдвига блока вправо, влево, вверх, вниз с помощью клавиш стрелок. Бонус - добавьте на пробел возможность поворота фигуры вокруг оси на 45 градусов.

let sq = document.querySelector('.sq');
    sq.style.left = 0;
    sq.style.top = 0;
    let x = 45;
    let a = 0;

   document.addEventListener('keydown', function(e) {
     y = parseInt(sq.style.left);
     z = parseInt(sq.style.top);
     a++;

     if(a % 2 == 0) {
     x = 0;
       } else {
             x = 45;
       }

     switch(e.keyCode) {
       case 37: if(y >= 10) {sq.style.left = y - 10 + 'px'};
       break;

       case 38: if(z >= 10) {sq.style.top = z - 10 + 'px'};// up
       break;

       case 39: if(y <= 655) {sq.style.left = y + 10 + 'px'};// right
       break;

       case 40: if(z <= 355) {sq.style.top = z + 10 + 'px'};// down
       break;

       case 32: sq.style.transform = `rotate(${x}deg)`;
       break;

   }
   });


   // модал

let modalWrapp = document.querySelector('.modal-wrapp');

      modalWrapp.addEventListener('click', function(e) {
         let taetl = document.querySelectorAll('.taetl');
         let hid = document.querySelectorAll('.modal-wrapp .text');

       if ( e.target.classList[0] == "modal-wrapp" || e.target.classList[0] == "text" ) {
         } else {

          for (let i = 0; i < taetl.length; i++) {
               if(taetl[i] == e.target) {
                  hid[i].classList.remove('hide');
                 taetl[i].style.fontWeight = '900';

        } else {
                 hid[i].classList.add('hide');
                taetl[i].style.fontWeight = '300';
}
}
}
    });























   //
