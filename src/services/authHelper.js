// authHelper.js

// Função para salvar o token no localStorage
export const saveToken = (token) => {
  localStorage.setItem('authToken', token);
};

// Função para obter o token do localStorage
export const getToken = () => {
  return localStorage.getItem('authToken');
};

// Função para remover o token do localStorage
export const removeToken = () => {
  localStorage.removeItem('authToken');
};

// Função para configurar o header de autorização
export const setAuthHeader = () => {
  const token = getToken();
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};
