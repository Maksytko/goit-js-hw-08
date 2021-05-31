import defaultExport from './gallery-items.js'

const galleryListEl = document.querySelector('.gallery')
const modalEl = document.querySelector('.lightbox')
const modalImgEl = document.querySelector('.lightbox__image')
const modalButtonEl = document.querySelector('.lightbox__button')
const overlayEl = document.querySelector('.lightbox__overlay')
let currentModalImgIndex


const createGalleryElementMarkup = function (elem) {
    return `
    <li class="gallery__item">
        <a
            class="gallery__link"
            href="${elem.original}"
        >
            <img
                class="gallery__image"
                src="${elem.preview}"
                data-source="${elem.original}"
                alt="${elem.description}"
            />
        </a>
    </li>
    `
}


const createGalleryListMarkup = function (array) {
    return array.map(createGalleryElementMarkup).join('')
}


galleryListEl.innerHTML = createGalleryListMarkup(defaultExport)


const findCurrentModalImgIndex = function (array) {
    let modalImgIndex
    array.forEach((elem, index) => {
        if (elem.original === modalImgEl.src) {
            modalImgIndex = index
        }
    })

    return modalImgIndex 
}


const removeAttributes = function () {
    modalEl.classList.remove('is-open')
    modalImgEl.src = ''
    modalImgEl.alt = '' 
}


const removeListeners = function () {
    document.removeEventListener('keydown', onEscButtonPress)
    document.removeEventListener('keydown', changeModalImgByRightButtonPress)
    document.removeEventListener('keydown', changeModalImgByLeftButtonPress)
}


const onImgClick = function (event) {
    if (event.target.nodeName !== 'IMG') {
        return
    }

    event.preventDefault()
    
    modalEl.classList.add('is-open')
    modalImgEl.src = event.target.dataset.source
    modalImgEl.alt = event.target.alt
    currentModalImgIndex = findCurrentModalImgIndex(defaultExport)

    document.addEventListener('keydown', onEscButtonPress)
    document.addEventListener('keydown', changeModalImgByRightButtonPress)
    document.addEventListener('keydown', changeModalImgByLeftButtonPress)
}


const onModalExitElClick = function () {
    removeAttributes()
    removeListeners()
}


const onEscButtonPress = function (event) {
    if (event.code !== 'Escape') {
        return
    }

    removeAttributes()
    removeListeners()
}


const changeModalImgByRightButtonPress = function (event) {
    if (event.code === 'ArrowRight') {
        const nextModalImgindex = currentModalImgIndex + 1
        if (nextModalImgindex < defaultExport.length) {
            currentModalImgIndex += 1

            modalImgEl.src = defaultExport[nextModalImgindex].original
            modalImgEl.alt = defaultExport[nextModalImgindex].description
        } else {
            modalImgEl.src = defaultExport[0].original
            modalImgEl.alt = defaultExport[0].description

            currentModalImgIndex = 0
        }
    }

}


const changeModalImgByLeftButtonPress = function (event) {
    if (event.code === 'ArrowLeft') {
        const nextModalImgindex = currentModalImgIndex - 1
        if (nextModalImgindex < 0) {
            modalImgEl.src = defaultExport[defaultExport.length - 1].original
            modalImgEl.alt = defaultExport[defaultExport.length - 1].description

            currentModalImgIndex = defaultExport.length - 1
        } else {
            currentModalImgIndex -= 1

            modalImgEl.src = defaultExport[nextModalImgindex].original
            modalImgEl.alt = defaultExport[nextModalImgindex].description
        }
    }

}




overlayEl.addEventListener('click', onModalExitElClick)
galleryListEl.addEventListener('click', onImgClick)
modalButtonEl.addEventListener('click', onModalExitElClick)

