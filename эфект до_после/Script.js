
let but = document.getElementById('btn'),
    slider = document.querySelector('.slider'),
    after = document.querySelector('.slider-after');

but.onmousedown = function(e) {
let shiftX = e.offsetX;

  slider.onmousemove = function (e) {

    let x = e.offsetX;
    after.style.width = x - shiftX + 'px';
    but.style.left = x -shiftX + 'px';

    if (x < 2 || x > 598) {
      slider.onmousemove = null;
    }
}
but.onmouseup = function() {
 slider.onmousemove = null;
}
but.ondragstart = function() {
  return false;
}
}
