import axios from 'axios';

const gamesApi = axios.create({
  baseURL: 'http://localhost:8000',
});

export const getGames = async () => {
  const response = await gamesApi.get('/games');
  return response.data;
};
