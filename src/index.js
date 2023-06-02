import './css/styles.css';
import notiflix from 'notiflix';
// Descris în documentație
import simpleLightbox from "simplelightbox";
// Import suplimentar de stil
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchImages } from './js/fetchImages';
import { renderGallery } from './js/renderImages';

const body = document.querySelector('body');
body.style.background ='linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,22,121,1) 11%, rgba(0,212,255,1) 100%)';
const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let query = '';
let page = 1;
let simpleLightBox;
const perPage = 40;

searchForm.addEventListener('submit', onSearchForm);

function onSearchForm(e) {
  e.preventDefault();
  page = 1;
  query = e.currentTarget.searchQuery.value.trim();
  gallery.innerHTML = '';
  
  if (query === '') {
    alertNoEmptySearch();
    return;
  }

  fetchImages(query, page, perPage)
    .then(({ data }) => {
      if (data.totalHits === 0) {
        alertNoImagesFound();
      } else {
        renderGallery(data.hits);
        simpleLightBox = new simpleLightbox('.gallery a').refresh();
        alertImagesFound(data);
      }
    })
    .catch(error => console.log(error))
    .finally(() => {
      searchForm.reset();
    });
}

function alertImagesFound(data) {
  notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
}

function alertNoEmptySearch() {
  notiflix.Notify.failure(
    'The search string cannot be empty. Please specify your search query.'
  );
}

function alertNoImagesFound() {
  notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}
