import axios from 'axios';

const API_URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits';

export const createHabit = (habitData, token) => {
  return axios.post(API_URL, habitData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listHabits = (token) => {
  return axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteHabit = (habitId, token) => {
  return axios.delete(`${API_URL}/${habitId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getTodayHabits = (token) => {
  return axios.get(`${API_URL}/today`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const checkHabit = (habitId, token) => {
  return axios.post(`${API_URL}/${habitId}/check`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const uncheckHabit = (habitId, token) => {
  return axios.post(`${API_URL}/${habitId}/uncheck`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Adicione outras funções conforme necessário, como check/uncheck hábitos
