import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Habitos from './pages/Habitos';
import Hoje from './pages/Hoje';
import Cadastro from './pages/Cadastro';
import ProtectedRoute from './components/ProtectedRoute';
import { UserContext } from './contexts/UserContext';
import './App.css';

function App() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/hoje');
    }
  }, [user, navigate]);

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

