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

// Adicione outras funções conforme necessário, como check/uncheck hábitos
