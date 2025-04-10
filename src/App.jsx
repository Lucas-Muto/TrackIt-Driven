import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Habitos from './pages/Habitos';
import Hoje from './pages/Hoje';
import Cadastro from './pages/Cadastro';
import ProtectedRoute from './components/ProtectedRoute';
import { UserContext } from './contexts/UserContext';
import { getToken } from './services/authHelper';
import './App.css';

function App() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Só redireciona se estiver na rota raiz e o usuário estiver logado
    if (window.location.pathname === '/' || window.location.pathname === '/login') {
      const token = getToken();
      if (token) {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          setUser(storedUser);
          navigate('/hoje');
        }
      }
    }
  }, [navigate, setUser]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/habitos" element={<ProtectedRoute element={<Habitos />} />} />
      <Route path="/hoje" element={<ProtectedRoute element={<Hoje />} />} />
    </Routes>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

