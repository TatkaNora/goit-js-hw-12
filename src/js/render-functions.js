import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const moreButton = document.querySelector('.more-button');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});


export function createGallery(images) {
  const markup = images
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" width="360" height="200" loading="lazy" />
        </a>
        <ul class="info">
          <li class="info-item"><span class="info-label">Likes</span><span class="info-value">${likes}</span></li>
          <li class="info-item"><span class="info-label">Views</span><span class="info-value">${views}</span></li>
          <li class="info-item"><span class="info-label">Comments</span><span class="info-value">${comments}</span></li>
          <li class="info-item"><span class="info-label">Downloads</span><span class="info-value">${downloads}</span></li>
        </ul>
      </li>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('is-hidden');
}

export function hideLoader() {
  loader.classList.add('is-hidden');
}

export function showLoadMoreButton() {
  moreButton.style.display = 'block';
}

export function hideLoadMoreButton() {
  moreButton.style.display = 'none';
}