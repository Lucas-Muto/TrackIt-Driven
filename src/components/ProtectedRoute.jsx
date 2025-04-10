import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { getToken } from '../services/authHelper';

const ProtectedRoute = ({ element }) => {
  const { user, setUser } = useContext(UserContext);
  
  // Verifica se há um token no localStorage
  const token = getToken();
  
  // Se não houver token, redireciona para o login
  if (!token) {
    return <Navigate to="/login" />;
  }
  
  // Carrega o usuário do localStorage usando useEffect
  useEffect(() => {
    // Se houver token mas não houver usuário no contexto, tenta carregar do localStorage
    if (!user && token) {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        // Atualiza o contexto com o usuário armazenado
        setUser(storedUser);
      }
    }
  }, [user, setUser, token]);
  
  return element;
};

export default ProtectedRoute;
