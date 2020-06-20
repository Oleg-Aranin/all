let $start = document.querySelector(`.js-start`)
let $game = document.querySelector(`.game`)
let score = 0
let $time = document.querySelector(`.js-time`)
let $risult = document.querySelector(`.js-result`)
let $timeHeader = document.querySelector(`.js-time-header`)
let resultHeder = document.querySelector(`.js-result-heder`)
let $gameTime = document.querySelector(`.js-game-time`)


$start.addEventListener('click', startGame)
$gameTime.addEventListener('input', setGameTime)

function show($el) {
  $el.classList.remove(`hide`)
}

function hide($el) {
 $el.classList.add(`hide`)
}


function startGame() {
score = 0
setGameTime()
$gameTime.setAttribute(`disabled`, `true`)
$game.addEventListener('click', handleBoxClick)
hide($start)
$game.style.background = `#fff`

let interval = setInterval(() => {
   let time = parseFloat($time.textContent)

   time <= 0 ? ( endGame(),  clearInterval(interval) ) : $time.textContent = (time - 0.1).toFixed(1)

}, 100)

renderBox()

}


function setGameScore() {
  $risult.textContent = score.toString()
}

function setGameTime() {
  let time = +$gameTime.value
  $time.textContent = time.toFixed(1)
  hide(resultHeder)
  show($timeHeader)

}


function endGame() {
 setGameScore()
 show($start)
 $game.style.background = null
 $game.innerHTML = ` `
 hide($timeHeader)
 show(resultHeder)
 $gameTime.removeAttribute(`disabled`)

}


function handleBoxClick(e) {
 e.target.getAttribute(`is`) == `box` ? (renderBox(), ++score)  : null
}

function renderBox() {
$game.innerHTML = ` `
let box = document.createElement(`div`, `box`)

let boxSize = getRandom(30, 100)
let gameSize = $game.getBoundingClientRect()
let maxTop = gameSize.height - boxSize
let maxLeft = gameSize.width - boxSize




box.style.cssText = `
  height: ${boxSize}px;
  width: ${boxSize}px;
  position: absolute;
  background: rgb(${getRandom(0, 256)}, ${getRandom(0, 256)}, ${getRandom(0, 256)});
  top: ${getRandom(0, maxTop)}px;
  left: ${getRandom(0, maxLeft)}px;
  cursor: pointer;
  `

$game.insertAdjacentElement(`afterbegin`, box)
}

function getRandom(min, max) {
 return Math.floor(Math.random() * (max - min) + min)
}









//
