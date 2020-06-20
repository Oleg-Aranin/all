let input = document.querySelector('.js-inut-URL'),
obvertka = document.querySelector('.js-obvertka-URL'),
arryURL = [];

sobInput(obvertka, arryURL);
restor(obvertka);


function sobInput(obvertka, arryURL) {

  input.addEventListener('change', function() {

    let a = input.value;

    let li = document.createElement('li')
    li.innerHTML = `<img class="src-URL" src="${a}" >`;
    obvertka.append(li);
    arryURL.push(a);
    localStorage.setItem('fotos', JSON.stringify(arryURL));


  });
}

function restor(obvertka) {
  let z = JSON.parse(localStorage.getItem('fotos'));

  if(!!z) {
    z.forEach((src) => {
      let li = document.createElement('li')
      li.innerHTML = `<img class="src-URL" src="${src}" >`;
      obvertka.append(li);

    })
  }
}
