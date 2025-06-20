import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '50859132-8d9ad7116e4a90f08d2e16751';   

export const PER_PAGE = 15;

export async function getImagesByQuery(query, page = 1) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: PER_PAGE,
  };

  const { data } = await axios.get(BASE_URL, { params });
  return data;
}