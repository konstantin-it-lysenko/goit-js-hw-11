import axios from "axios";
import Notiflix from "notiflix";

const formEl = document.getElementById('search-form');
const galleryEl = document.querySelector('.gallery');
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '39983017-ab6cfdfc6bbf03f7c61f72b59';

formEl.addEventListener('submit', submitBtnHandler);

function submitBtnHandler(event) {
  event.preventDefault();
  const searchQuery = event.currentTarget.elements.searchQuery.value;

  if (!searchQuery.trim()) {
    return Notiflix.Notify.warning('Please enter your request', {
      distance: '90px',
      position: "center-top"
    })
  }

  const params = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true
  })

  const response = axios.get(`${BASE_URL}?${params}`)
    .then(data => {
      createMarkup((data.data.hits))
      Notiflix.Notify.success('Success', {
        distance: '20px',
        position: "right-bottom"
      })
    }
    ).catch(error => {
      Notiflix.Notify.failure(`Oops! Something went wrong ${error}`, {
        position: "right-top"
      })
    });

}

function createMarkup(arr) {
  galleryEl.innerHTML = arr.map(obj => {
    return `<div class="photo-card">
    <img src="${obj.webformatURL}" alt="${obj.tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
         <b>Likes:</b>  ${obj.likes}
      </p>
      <p class="info-item">
        <b>Views:</b> ${obj.views}
      </p>
      <p class="info-item">
        <b>Comments:</b> ${obj.comments}
      </p>
      <p class="info-item">
        <b>Downloads:</b> ${obj.downloads}
      </p>
    </div>
  </div>`
  }).join();
}
