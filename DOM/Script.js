// прячем элементы. форматируем текст
let but = document.querySelector('.hide');

but.addEventListener('click', () => {
    let href = document.querySelector('link');

    href.outerHTML = '<link href="style2.css" rel="stylesheet">';
    console.log(href = 'style2.css');
});

// добовляем текст в конец
let addWord = document.querySelector('.js-hi');

addWord.addEventListener('click', () => {
  let hi = document.querySelector('.hi');
   hi.insertAdjacentHTML('beforeEnd', ' word');
});

// добовляем текст между тегом и ceo текстом
let hello = document.querySelector('.js-Hello');

hello.addEventListener('click', function a() {
  let p = document.querySelector('.Hello');

  p.insertAdjacentHTML('afterBegin', ' текст между тегом ');
  hello.removeEventListener("click", a);
});

// add before
let before = document.querySelector('.js-4');

before.addEventListener('click', function b() {
  let p = document.querySelector('.ss-4');

  p.insertAdjacentHTML('beforeBegin', ' текст перед тегом ')
  before.removeEventListener("click", b);
});

// beforeEnd

let beforeEnd = document.querySelector('.js-5');

beforeEnd.addEventListener('click', function c() {
  let p = document.querySelector('.ss-5');

  p.insertAdjacentHTML('beforeEnd', ' текст перед закрывающим тегом ')
  beforeEnd.removeEventListener("click", c);
});

// замена внутри тега c inner
let replaceInner = document.querySelector('.js-6');

 replaceInner.addEventListener('click', unit6);

function unit6() {
  let p = document.querySelector('.ss-6');
      p.innerHTML = '<b>Hi</b>';
      replaceInner.removeEventListener("click", unit6);
      replaceInner.addEventListener('click', unit66);
}

function unit66() {
      let b = document.querySelector('b');
      b.outerText = '<b>Hi</b>';
      replaceInner.removeEventListener("click", unit66);
      replaceInner.addEventListener('click', unit6);
}

// замена внутри тега c outer
let replace = document.querySelector('.js-7');

 replace.addEventListener('click', htmlJs);

function htmlJs() {
  let p = document.querySelector('.ss-7');
      p.outerHTML = '<b class="js-text-7">Hi</b>';
      replace.removeEventListener("click", htmlJs);
      replace.addEventListener('click', textJs);
}

function textJs() {
  console.log(document.querySelectorAll('b'))
      let b = document.querySelector('.js-text-7');
      b.outerText = '<b>Hi</b>';
      replace.removeEventListener("click", textJs, htmlJs);
}












//
