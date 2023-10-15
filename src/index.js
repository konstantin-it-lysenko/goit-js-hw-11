import axios from "axios";
import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

const formEl = document.getElementById('search-form');
const galleryEl = document.querySelector('.gallery');
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '39983017-ab6cfdfc6bbf03f7c61f72b59';

formEl.addEventListener('submit', submitBtnHandler);

async function submitBtnHandler(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const searchQuery = event.currentTarget.elements.searchQuery.value;
  let page = 1;

  if (!searchQuery.trim()) {
    return Notiflix.Notify.warning('Please enter your request', {
      distance: '90px',
      position: "center-top"
    })
  }

  try {
    const queryData = await getQueryData(searchQuery, page);
    console.log(queryData.hits);
    galleryEl.innerHTML = createGalleryMarkup(queryData.hits)
  } catch {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  form.reset();

  let gallery = new SimpleLightbox('.gallery a');
}

async function getQueryData(searchQuery, page = 1) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page,
  });

  const response = await axios.get(`${BASE_URL}?${params}`);

  return response.data;
}

function createGalleryMarkup(queryData) {
  return queryData.map(createMarkup).join('');
}

function createMarkup({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `<div class="photo-card">
    <a href="${largeImageURL}">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    </a>
    <div class="info">
      <p class="info-item">
         <b>Likes:</b>  ${likes}
      </p>
      <p class="info-item">
        <b>Views:</b> ${views}
      </p>
      <p class="info-item">
        <b>Comments:</b> ${comments}
      </p>
      <p class="info-item">
        <b>Downloads:</b> ${downloads}
      </p>
    </div>
  </div>`
};
