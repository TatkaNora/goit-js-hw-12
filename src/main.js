import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery, PER_PAGE } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

const notify = msg =>
  iziToast.show({
    title: msg,
    backgroundColor: '#ef4040',
    titleColor: '#fff',
    position: 'topCenter',
  });

let currentQuery = '';
let page = 1;

const form = document.querySelector('.form');
const moreButton = document.querySelector('.more-button');

form.addEventListener('submit', onSearch);
moreButton.addEventListener('click', loadMore);

async function onSearch(e) {
  e.preventDefault();
  const query = e.target.elements['search-text'].value.trim();
  if (!query) {
    notify('Form field must be filled in!');
    return;
  }

  currentQuery = query;
  page = 1;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page);
    if (data.hits.length === 0) {
      notify('Sorry, there are no images matching your search query. Please try again!');
      return;
    }

    createGallery(data.hits);

    data.totalHits > PER_PAGE ? showLoadMoreButton() : hideLoadMoreButton();
  } catch {
    notify('An error occurred while fetching images. Please try again later.');
  } finally {
    hideLoader();
    form.reset();
  }
}

async function loadMore() {
  page += 1;
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page);
    createGallery(data.hits);

    if (data.totalHits > page * PER_PAGE) {
      showLoadMoreButton();
    } else {
      notify("We're sorry, but you've reached the end of search results.");
    }

    smoothScroll();
  } catch (error) {
    notify('Failed to load more images');
    console.error(error);
  } finally {
    hideLoader();
  }
}

function smoothScroll() {
  const { height: cardHeight } =
    document.querySelector('.gallery').firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
