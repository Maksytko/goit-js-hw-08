import defaultExport from "/gallery-items.js"

const galleryListEl = document.querySelector('.gallery')
const modalEl = document.querySelector('.lightbox')
const modalImgEl = document.querySelector('.lightbox__image')
const modalButtonEl = document.querySelector('.lightbox__button')

const createGalleryElementMarkup = function (elem)  {
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


const onImgClick = function (event) {
    if (event.target.nodeName !== 'IMG') {
        return
    }

    event.preventDefault()
    
    modalEl.classList.add('is-open')
    modalImgEl.src = event.target.dataset.source
    modalImgEl.alt = event.target.alt

}

const onModalButtonClick = function () {
    modalEl.classList.remove('is-open')
    modalImgEl.src = ''
    modalImgEl.alt = ''
}

const onEscKeyPress = function (event) {
    if (modalEl.classList.contains('is-open')) {
        if (event.code === 'Escape') {
            modalEl.classList.remove('is-open')
        }
    }
}


galleryListEl.addEventListener('click', onImgClick)
modalButtonEl.addEventListener('click', onModalButtonClick)
document.addEventListener('keydown', onEscKeyPress)
