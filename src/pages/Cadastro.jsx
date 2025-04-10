import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../services/authService';
import styled from 'styled-components';

const Cadastro = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signUp({ email, password, name, image });
      alert('Cadastro realizado com sucesso!');
      navigate('/login');
    } catch (error) {
      alert('Erro ao cadastrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CadastroForm onSubmit={handleSignUp}>
      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
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
      <input
        type="url"
        placeholder="URL da Imagem"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Carregando...' : 'Cadastrar'}
      </button>
      <button type="button" onClick={() => navigate('/login')}>
        Já tem uma conta? Faça login
      </button>
    </CadastroForm>
  );
};

const CadastroForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default Cadastro;
