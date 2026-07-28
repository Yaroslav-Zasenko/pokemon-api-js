import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryList = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

const gallery = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

export function clearGallery() {
  galleryList.innerHTML = '';
}

export function showLoader() {
  loader.classList.add('is-active');
}

export function hideLoader() {
  loader.classList.remove('is-active');
}

export function createGallery(images) {
  const markup = images
    .map(image => {
      return `<li class="gallery-item">
        <a class="gallery-link" href="${image.largeImageURL}">
          <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}" loading="lazy">
        </a>
        <div class="info">
          <p class="info-item"><b>Likes</b><br>${image.likes}</p>
          <p class="info-item"><b>Views</b><br>${image.views}</p>
          <p class="info-item"><b>Comments</b><br>${image.comments}</p>
          <p class="info-item"><b>Downloads</b><br>${image.downloads}</p>
        </div>
      </li>`;
    })
    .join('');

  galleryList.insertAdjacentHTML('beforeend', markup);
  gallery.refresh();
}
