import { galleryItems } from './gallery-items.js';
// Change code below this line

// console.log(galleryItems);
// console.log(basicLightbox);

const refs = {
  containerForMarkup: document.querySelector('.gallery'),
};

let createEl;

refs.containerForMarkup.addEventListener('click', onImageClick);

const createElement = galleryItems
  .map(
    ({ preview, original, description }) => `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`
  )
  .join('');
refs.containerForMarkup.insertAdjacentHTML('beforeend', createElement);

function onImageClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  createEl = basicLightbox.create(
    `<img src="${event.target.dataset.source}" 
          alt="${event.target.alt}"
        />`,
    {
      onShow: () => {
        window.addEventListener('keydown', onEscKeyPress);
      },
      onClose: () => {
        window.removeEventListener('keydown', onEscKeyPress);
      },
    }
  );

  createEl.show();
}

function onEscKeyPress(event) {
  if (event.code !== 'Escape') {
    return;
  }
  createEl.close();
}
