'use strict'

var gMeme
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
var gNextId = 0

var gImgs

// var gImgs = [
//   {
//     id: 1,
//     url: 'meme-imgs/meme-imgs (square)/1.jpg',
//     keywords: ['funny', 'cat'],
//   },
//   {
//     id: 2,
//     url: 'meme-imgs/meme-imgs (square)/2.jpg',
//     keywords: ['funny', 'cat'],
//   },
// ]

var gMeme = {
  selectedImgId: 0,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'write here',
      pos: { x: 200, y: 20 },
      size: 40,
      color: 'red',
      font: 'Impact',
      isDrag: false,
    },
  ],
}
var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }

function getMeme() {
  return gMeme
}

function getImgs() {
  return gImgs
}

function getSelectedImgId() {
  console.log('gImgs[gMeme.selectedImgId] :', gImgs[gMeme.selectedImgId])
  return gImgs[gMeme.selectedImgId].id
}

function getSelectedLine() {
  return gMeme.lines[gMeme.selectedLineIdx]
}

function setLineTxt(msg) {
  gMeme.lines[gMeme.selectedLineIdx].txt = msg
}

function setLineColor(color) {
  gMeme.lines[gMeme.selectedLineIdx].color = color
}

function setImg(imgId) {
  gMeme.selectedImgId = imgId
}

function setSize(diff) {
  gMeme.lines[gMeme.selectedLineIdx].size += diff
}

function setFont(font) {
  const line = getSelectedLine()
  line.font = font
}

function addLine() {
  const newLine = createLine()
  gMeme.lines.push(newLine)
}

function switchLine() {
  gMeme.selectedLineIdx++
  if (gMeme.selectedLineIdx >= gMeme.lines.length) {
    gMeme.selectedLineIdx = 0
  }
}

function deleteLine(idx = gMeme.selectedLineIdx) {
  gMeme.lines.splice(idx, 1)
}

function getLines() {
  return gMeme.lines
}

function createLine() {
  if (gMeme.lines.length === 0) {
    return {
      txt: 'write here',
      pos: { x: 200, y: 20 },
      size: 40,
      color: 'red',
      font: 'Impact',
      isDrag: false,
    }
  }

  if (gMeme.lines.length === 1) {
    return {
      txt: 'write here',
      pos: { x: 200, y: 400 },
      size: 40,
      color: 'red',
      font: 'Impact',
      isDrag: false,
    }
  }

  return {
    txt: 'write here',
    pos: { x: 200, y: 200 },
    size: 40,
    color: 'red',
    font: 'Impact',
    isDrag: false,
  }
}

function downloadMeme(elLink) {
  const dataUrl = gElCanvas.toDataURL()
  // console.log('dataUrl:', dataUrl)
  elLink.href = dataUrl
  // Set a name for the downloaded file
  elLink.download = 'my-img'
}

function isLineClicked(clickedPos) {
  const idx = gMeme.lines.findIndex((line) => {
    const { pos, size, txt } = line
    const textMetrics = gCtx.measureText(txt)
    const textWidth = textMetrics.width
    return (
      clickedPos.x >= pos.x &&
      clickedPos.x <= pos.x + textWidth &&
      clickedPos.y >= pos.y &&
      clickedPos.y <= pos.y + size
    )
  })

  if (idx !== -1) gMeme.selectedLineIdx = idx
  return idx !== -1
}

function setLineDrag(isDrag) {
  gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}

function moveLine(dx, dy) {
  const curPos = gMeme.lines[gMeme.selectedLineIdx].pos
  curPos.x += dx
  curPos.y += dy
}

function createImgs() {
  gImgs = []
  for (var i = 0; i < 18; i++) {
    gImgs.push(createImg())
  }
}

function createImg(keywords = ['funny', 'baby']) {
  return {
    id: gNextId++, //1
    url: `meme-imgs/meme-imgs (square)/${gNextId}.jpg`,
    keywords,
  }
}
