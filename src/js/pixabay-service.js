import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '39983017-ab6cfdfc6bbf03f7c61f72b59';

export default async function getQueryData(searchQuery, page = 1) {
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
