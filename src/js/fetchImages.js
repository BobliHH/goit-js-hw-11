import axios from 'axios';

export { fetchImages };

this.$axios.defaults.baseURL = 'https://pixabay.com/api/';
const AUTH_KEY = '36858023-bcc8002212b119e45a3b53208';

async function fetchImages(query, page, perPage) {
  const response = await axios.get(
    `?key=${AUTH_KEY}&q=${query}&image_type=all&page=${page}&per_page=${perPage}`
  );
  return response;
}