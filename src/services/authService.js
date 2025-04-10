import axios from 'axios';

const API_URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth';

export const signUp = (userData) => {
  return axios.post(`${API_URL}/sign-up`, userData);
};

export const login = (credentials) => {
  return axios.post(`${API_URL}/login`, credentials);
};
