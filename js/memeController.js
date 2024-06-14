'use strict'

var gElCanvas
var gCtx
var gStartPos

function onInit() {
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')
  addListeners()

  resizeCanvas()

  renderMeme()
}

function renderMeme() {
  const elImg = new Image()
  const meme = getMeme()
  const imgs = getimgs()

  elImg.src = imgs[meme.selectedImgId - 1].url

  elImg.onload = () => {
    gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight)

    const lines = getLines()
    lines.forEach((line) => {
      drawText(line)
    })

    drawOutLine(lines[meme.selectedLineIdx])
  }
}

function drawText(curLine) {
  gCtx.beginPath()
  gCtx.lineWidth = 2
  gCtx.strokeStyle = curLine.color
  gCtx.fillStyle = curLine.color
  gCtx.font = `${curLine.size}px Arial`
  gCtx.textAlign = 'left'
  gCtx.textBaseline = 'top'
  gCtx.fillText(curLine.txt, curLine.pos.x, curLine.pos.y)
  gCtx.strokeText(curLine.txt, curLine.pos.x, curLine.pos.y)
}

function drawOutLine(curLine) {
  const textMetrics = gCtx.measureText(curLine.txt)

  const textWidth = textMetrics.width
  const textHeight = curLine.size

  const x = curLine.pos.x
  const y = curLine.pos.y

  gCtx.beginPath()
  gCtx.setLineDash([5, 3])
  gCtx.strokeStyle = 'whiteSmoke'
  gCtx.lineWidth = 3
  gCtx.strokeRect(x, y, textWidth, textHeight)
}

function onDown(ev) {
  //* Get the ev pos from mouse or touch
  const pos = getEvPos(ev)
  if (!isLineClicked(pos)) return
  renderMeme()
  setLineDrag(true)
  //* Save the pos we start from
  gStartPos = pos
  document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
  // console.log('onMove')
  const { isDrag } = getSelectedLine()
  if (!isDrag) return
  const pos = getEvPos(ev)
  //* Calc the delta, the diff we moved
  const dx = pos.x - gStartPos.x
  const dy = pos.y - gStartPos.y
  console.log('dx :', dx)
  console.log('dy :', dy)
  moveLine(dx, dy)
  //* Save the last pos, we remember where we`ve been and move accordingly
  gStartPos = pos
  //* The canvas is render again after every move
  renderMeme()
}

function onUp() {
  setLineDrag(false)
  document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
  let pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }

  if (TOUCH_EVS.includes(ev.type)) {
    //* Prevent triggering the mouse ev
    ev.preventDefault()
    //* Gets the first touch point
    ev = ev.changedTouches[0]
    //* Calc the right pos according to the touch screen
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    }
    // console.log('pos:', pos)
  }
  return pos
}

//* Handle the listeners
function addListeners() {
  addMouseListeners()
  addTouchListeners()
  //* Listen for resize ev

  window.addEventListener('resize', () => {
    resizeCanvas()
    renderMeme()
  })
}

function addMouseListeners() {
  gElCanvas.addEventListener('mousedown', onDown)
  gElCanvas.addEventListener('mousemove', onMove)
  gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchstart', onDown)
  gElCanvas.addEventListener('touchmove', onMove)
  gElCanvas.addEventListener('touchend', onUp)
}

function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container')
  gElCanvas.width = elContainer.offsetWidth
  gElCanvas.height = elContainer.offsetHeight
  console.log('elContainer.offsetHeight :', elContainer.offsetHeight)
}

function onSetLineTxt(msg) {
  setLineTxt(msg)
  renderMeme()
}
function onSetLineColor(color) {
  setLineColor(color)
  renderMeme()
}

function onSetFont(diff) {
  setFont(diff)
  renderMeme()
}

function onAddLine() {
  addLine()
  renderMeme()
}

function onSwitchLine() {
  switchLine()
  renderMeme()
}

function onClearinputKey(event, inputElement) {
  if (event.key === 'Escape' || event.key === 'Enter') {
    inputElement.value = ''
  }
}

function onDownload(elLink) {
  downloadMeme(elLink)
}
