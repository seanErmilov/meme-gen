'use strict'

var gElCanvas
var gCtx

function onInit() {
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')

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
  }
}

function drawText(curLine) {
  gCtx.lineWidth = 2
  gCtx.strokeStyle = curLine.color
  gCtx.fillStyle = curLine.color
  gCtx.font = `${curLine.font}px Arial`
  gCtx.textAlign = 'center'
  gCtx.textBaseline = 'middle'
  gCtx.fillText(curLine.txt, curLine.pos.x, curLine.pos.y)
  gCtx.strokeText(curLine.txt, curLine.pos.x, curLine.pos.y)
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

function onClearinputKey(event, inputElement) {
  if (event.key === 'Escape' || event.key === 'Enter') {
    inputElement.value = ''
  }
}

function onDownload(elLink) {
  downloadMeme(elLink)
}
