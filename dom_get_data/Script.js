
//background
let but_1 = document.querySelector('.but-color-1');
but_1.addEventListener('click', function() {
  let a = document.querySelector('.input-color-1').value;
          document.body.style.background = a;
});

// background + text

let butTow = document.querySelector('.but-color-2'),
    reset = document.querySelector('.but-color-3');

butTow.addEventListener('click', function() {
    let bgV = document.querySelector('.input-color-2-bg').value,
       textV = document.querySelector('.input-color-2-text').value,
       bgDiv = document.querySelector('.div-color-2');
       bgDiv.style.background = bgV;
       bgDiv.style.color = textV;
});

reset.addEventListener('click', function() {
  let divRes = document.querySelector('.div-color-2');
      divRes.style.background = null;
      divRes.style.color = null;
});

// range + span
let range = document.querySelector('.input-renge-3');
let p = document.querySelector('.p-renge-3');
let span = document.querySelector('.span-renge-3');

range.addEventListener('input', function() {

  span.innerText = p.style.fontSize = range.value + 'px';
});

// rgba
let rgb = document.querySelector('.rgb');

     rgb.addEventListener('mousemove', function() {
       let r = document.querySelector('.rgb-1').value,
           g = document.querySelector('.rgb-2').value,
           b = document.querySelector('.rgb-3').value,
           a = document.querySelector('.a-4').value,
           divRGB = document.querySelector('.rgb-color'),
           spavR = document.querySelector('.span-rgb-1'),
           spavG = document.querySelector('.span-rgb-2'),
           spavB = document.querySelector('.span-rgb-3');
           spavA = document.querySelector('.span-a-4');

           spavR.innerText = r;
           spavG.innerText = g;
           spavB.innerText = b;
           spavA.innerText = a/100;

           divRGB.style.background = `rgba(${r},${g},${b},${a/100})`;
     });
















//
