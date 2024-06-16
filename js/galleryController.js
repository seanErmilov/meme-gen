'use strict'

function onInit() {
  createImgs()
  renderGallery()
  //   addListeners()
  //   resizeCanvas()
  // renderMeme()
}

function onSelectImg(elImg) {
  setImg(elImg.dataset.id)
  addListeners()
  resizeCanvas()
  renderMeme()
}

function renderGallery() {
  var imgs = getImgs()
  var strHTML = imgs.map(
    (img) => `<img class='meme-img' data-id='${img.id}' src='${img.url}'></img>`
  )

  const elGallery = document.querySelector('.images-container')
  elGallery.innerHTML = strHTML.join('')

  addImageEventListeners(imgs)
}

function addImageEventListeners(imgs) {
  var imgList = document.querySelectorAll('.meme-img')

  imgList.forEach((img, idx) => {
    img.addEventListener('click', function () {
      renderPage('editor-container')
      onSelectImg(img)
    })
  })
}

function renderPage(elPage) {
  const pageValue = elPage.toLowerCase()
  const pageToRender = document.querySelector(`.${pageValue}`)
  console.log('pageToRender :', pageToRender)
  const allPages = document.querySelectorAll('.page')
  for (var i = 0; i < allPages.length; i++) {
    allPages[i].style.display = 'none'
  }
  pageToRender.style.display = 'block'
}
