
// выставляем рейтинг.

let button = document.querySelectorAll('.but-tow');

sobitie(button);
restoreg(button);

console.log(button);
function sobitie(button) {
 button.forEach((x) => {
  x.addEventListener('click', function(e) {
       button.forEach((x) => {
         x.style.background = 'rgb(106,4,133)';
         console.log(55);
       })


    for (let i = 0; i < button.length; i++) {
           button[i].style.background = '#1d9425';
           if (e.target == button[i]) {
             localStorage.setItem('numbar', i);
             break;
           }
      }
  });
 })
}

function restoreg(button) {


let x = localStorage.getItem('numbar');
if(!!x) {
for (let i = 0; i <= x; i++) {
       button[i].style.background = '#1d9425';
}
}
}

let dom = document.querySelector('.dom');

   dom.addEventListener('click', function() {

     dom.innerHTML = ++a;
     localStorage.setItem('click', a);
   });

   let a = localStorage.getItem('click') || 0;
       dom.innerHTML = a;






//
