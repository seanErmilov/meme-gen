'use strict'

var gMeme

var gImgs = [
  {
    id: 1,
    url: 'meme-imgs/meme-imgs (square)/1.jpg',
    keywords: ['funny', 'cat'],
  },
  {
    id: 2,
    url: 'meme-imgs/meme-imgs (square)/2.jpg',
    keywords: ['funny', 'cat'],
  },
]
var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [{ txt: 'Isometimeseat Falafel', size: 20, color: 'red' }],
}
var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }

function getMeme() {
  return gMeme
}

function getimgs() {
  return gImgs
}

function setLineTxt(msg) {
  console.log('msg :', msg)
  gMeme.lines[gMeme.selectedLineIdx].txt = msg
}

function setImg(imgId) {
  gMeme.selectedImgId = imgId
}
