import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import getQueryData from "./js/pixabay-service";
import createGalleryMarkup from "./js/gallery-markup";

const refs = {
  formEl: document.getElementById('search-form'),
  galleryEl: document.querySelector('.gallery'),
  queryBtn: document.querySelector('.form-btn'),
  loadMoreBtn: document.querySelector('.load-more')
}
let searchQuery = '';
let page = 1;

refs.formEl.addEventListener('submit', submitBtnHandler);
refs.loadMoreBtn.addEventListener('click', loadMoreBtnHandler);

async function submitBtnHandler(event) {
  event.preventDefault();
  const form = event.currentTarget;
  searchQuery = event.currentTarget.elements.searchQuery.value;
  page = 1;

  if (!searchQuery.trim()) {
    return Notiflix.Notify.warning('Please enter your request', {
      distance: '90px',
      position: "center-top"
    })
  }

  try {
    const queryData = await getQueryData(searchQuery);

    refs.galleryEl.innerHTML = createGalleryMarkup(queryData.hits);

    if (queryData.hits.length === 0) {
      failureResponse()
      refs.loadMoreBtn.classList.add('is-hidden');
    } else {
      refs.loadMoreBtn.classList.remove('is-hidden');
    }
  } catch { failureResponse }

  form.reset();

  gallery = new SimpleLightbox('.gallery a');
}

async function loadMoreBtnHandler() {
  page += 1;

  try {
    const queryData = await getQueryData(searchQuery, page);
    refs.galleryEl.insertAdjacentHTML('beforeend', createGalleryMarkup(queryData.hits));
    gallery = new SimpleLightbox('.gallery a');
  } catch { failureResponse }
}

function failureResponse() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}
