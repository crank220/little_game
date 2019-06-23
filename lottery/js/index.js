
function initRem() {
  document.documentElement.style.fontSize = (document.documentElement.clientWidth || window.innerWidth) * 16 / 375 + 'px'
}
initRem()
window.addEventListener('resize', function () { initRem() })

var transitionArr = [['x', 22.9], ['x', 22.9], ['y', 20], ['y', 20], ['x', -22.9], ['x', -22.9], ['y', -20], ['y', -20]]
var st = null, ing = false, speed, cur, step, end
function run() {
  var frame = document.querySelector('.lettery .box .game label')
  st = setInterval(function () {
    if (transitionArr[cur][0] === 'x') {
      var f_left = frame.style.left.indexOf('px') > -1 ? frame.style.left.replace('px', '') * 1 : frame.style.left.replace('vw', '') * 1
      frame.style.left = (f_left + transitionArr[cur][1]) + 'vw'
    } else {
      var f_top = frame.style.top.indexOf('px') > -1 ? frame.style.top.replace('px', '') * 1 : frame.style.top.replace('vw', '') * 1
      frame.style.top = (f_top + transitionArr[cur][1]) + 'vw'
    }
    cur++
    step++
    if (cur === 8) {
      cur = 0
    }
    if (step - end + 6 === 32) {
      clearInterval(st)
      speed = 300
      frame.style.transition = 'left .3s, top .3s'
      run()
    }
    if (step - end + 4 === 32) {
      clearInterval(st)
      speed = 500
      frame.style.transition = 'left .5s, top .5s'
      run()
    }
    if (step - end + 2 === 32) {
      clearInterval(st)
      speed = 700
      frame.style.transition = 'left .7s, top .7s'
      run()
    }
    if (step - end === 32) {
      clearInterval(st)
      setTimeout(function () {
        ing = false
        document.querySelector('.lettery .box .game .nine span:nth-child(5)').className = ''
        alert('游戏结束，你抽中了' + end)
        initLettery()
      }, 1000)
    }
  }, speed)
}
function begin() {
  var frame = document.querySelector('.lettery .box .game label')
  if (ing) return
  ing = true
  document.querySelector('.lettery .box .game .nine span:nth-child(5)').className = 'ban'
  speed = 100
  cur = 0
  step = 0
  end = Math.floor(Math.random() * 8)
  frame.style.left = 0
  frame.style.top = 0
  frame.style.transition = 'left .1s, top .1s'
  run()
}
function initLettery() {
  var frame = document.querySelector('.lettery .box .game label')
  frame.style.left = 0
  frame.style.top = 0
}