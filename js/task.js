import defaultExport from ".//gallery-items.js"

const galleryListEl = document.querySelector('.gallery')
const modalEl = document.querySelector('.lightbox')
const modalImgEl = document.querySelector('.lightbox__image')
const modalButtonEl = document.querySelector('.lightbox__button')
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


const onImgClick = function (event) {
    if (event.target.nodeName !== 'IMG') {
        return
    }

    event.preventDefault()
    
    modalEl.classList.add('is-open')
    modalImgEl.src = event.target.dataset.source
    modalImgEl.alt = event.target.alt
    currentModalImgIndex = findCurrentModalImgIndex(defaultExport)

}


const onModalButtonClick = function () {
    modalEl.classList.remove('is-open')
    modalImgEl.src = ''
    modalImgEl.alt = ''
}


const onEscButtonPress = function (event) {
    if (modalEl.classList.contains('is-open') && event.code !== 'Escape') {
        return
    }

    modalEl.classList.remove('is-open')
    modalImgEl.src = ''
    modalImgEl.alt = ''
}


const changeModalImgByRightButtonPress = function (event) {
    if (modalEl.classList.contains('is-open') && event.code === 'ArrowRight') {
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
    if (modalEl.classList.contains('is-open') && event.code === 'ArrowLeft') {
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

const onBlackPartModalElClick = function (event) {
    if (event.target.nodeName !== 'DIV') {
        return
    }

    modalEl.classList.remove('is-open')
    modalImgEl.src = ''
    modalImgEl.alt = ''    
}


modalEl.addEventListener('click', onBlackPartModalElClick)
galleryListEl.addEventListener('click', onImgClick)
modalButtonEl.addEventListener('click', onModalButtonClick)
document.addEventListener('keydown', onEscButtonPress)
document.addEventListener('keydown', changeModalImgByRightButtonPress)
document.addEventListener('keydown', changeModalImgByLeftButtonPress)
