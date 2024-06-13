'use strict'

var gElCanvas
var gCtx

function onInit() {
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')

  renderMeme()
}

function renderMeme(src = 'meme-imgs/meme-imgs (square)/1.jpg') {
  const elImg = new Image()
  const meme = getMeme()
  const imgs = getimgs()

  elImg.src = imgs[meme.selectedImgId - 1].url

  elImg.onload = () => {
    gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight)
    drawText()
  }
}

function drawText() {
  const selectedLine = getLine()
  gCtx.lineWidth = 2
  gCtx.strokeStyle = selectedLine.color
  gCtx.fillStyle = selectedLine.color
  gCtx.font = '40px Arial'
  gCtx.textAlign = 'center'
  gCtx.textBaseline = 'middle'
  gCtx.fillText(selectedLine.txt, selectedLine.pos.x, selectedLine.pos.y)
  gCtx.strokeText(selectedLine.txt, selectedLine.pos.x, selectedLine.pos.y)
}

function onSetLineTxt(msg) {
  setLineTxt(msg)
  renderMeme()
}
function onSetLineColor(color) {
  setLineColor(color)
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
