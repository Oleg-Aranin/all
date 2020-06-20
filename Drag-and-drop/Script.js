let but = document.getElementById('r'),
    top1 = document.getElementById('top'),
    left1 = document.getElementById('left');

//  function f1() {
//   let x = document.getElementById('top').value;
//   let y = document.getElementById('left').value;
//   let but = document.getElementById('r');
//
//
// but.onclick = function() {
//   but.style.top = x + 'px';
//   but.style.left = y + 'px';
//
//   console.log(but.style.top);
//   console.log(but.style.left);
// }
// }

but.onmousedown = function(e) {

   let coords = getCoords(but),
       shiftX = e.pageX - coords.left,
       shiftY = e.pageY - coords.top;

   but.style.position = 'absolute';
   document.body.appendChild(but);
   xxx(e);

  but.style.zIndex = 1000;

   function xxx(e) {
  top1.value = but.style.left = e.pageX - shiftX + 'px';
  left1.value = but.style.top = e.pageY - shiftY + 'px';



   }

   document.onmousemove = function(e) {
   xxx(e);
 }

 but.onmouseup = function() {
    document.onmousemove = null;
    but.onmouseup = null;
  }
  function getCoords(elem) {   // кроме IE8-
    var box = elem.getBoundingClientRect();
    console.log(box.top);
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };

  }

}














//
