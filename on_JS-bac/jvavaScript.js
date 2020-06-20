let x = document.getElementsByClassName("button-one");
let y = document.getElementsByClassName("image");
let z = document.getElementsByClassName("rt");



(function uu() {

for (let i = 0; i < y.length; i++) {
y[i].onmouseover = function(event) {
if (event.type == 'mouseover') {

z[i].style.display = 'inline';

z[i].onmouseout = function(event){
 if (event.type == 'mouseout') {
  z[i].style.display = 'none';
}}

}
}
}
})()
