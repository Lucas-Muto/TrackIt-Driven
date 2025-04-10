import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { login } from '../services/authService';
import { saveToken, saveUser } from '../services/authHelper';
import styled from 'styled-components';

const Login = () => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await login({ email, password });
      saveToken(response.data.token);
      saveUser(response.data);
      setUser(response.data);
      navigate('/hoje');
    } catch (error) {
      alert('Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginForm onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Carregando...' : 'Entrar'}
      </button>
      <button type="button" onClick={() => navigate('/cadastro')}>
        Não tem uma conta? Cadastre-se
      </button>
    </LoginForm>
  );
};

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default Login;
