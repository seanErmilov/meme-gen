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
    drawText(meme.lines[meme.selectedLineIdx].txt, gElCanvas.width / 2, 50)
  }
}

function drawText(text, x, y) {
  gCtx.lineWidth = 2
  gCtx.strokeStyle = 'brown'
  gCtx.fillStyle = 'black'
  gCtx.font = '40px Arial'
  gCtx.textAlign = 'center'
  gCtx.textBaseline = 'middle'
  gCtx.fillText(text, x, y)
  gCtx.strokeText(text, x, y)
}

function onSetLineTxt(msg) {
  setLineTxt(msg)
  renderMeme()
}
