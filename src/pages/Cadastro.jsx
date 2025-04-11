import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../services/authService';
import styled from 'styled-components';
import logo from '../assets/logo-login.svg';
import { ThreeDots } from 'react-loader-spinner';

const DEFAULT_PHOTO_URL = 'https://i.pinimg.com/1200x/d9/d8/8e/d9d88e3d1f74e2b8ced3df051cecb81d.jpg';

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
      // Se a imagem não for fornecida, usa a URL padrão
      const userImage = image.trim() === '' ? DEFAULT_PHOTO_URL : image;
      
      await signUp({ email, password, name, image: userImage });
      alert('Cadastro realizado com sucesso!');
      navigate('/login');
    } catch (error) {
      alert('Erro ao cadastrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CadastroContainer>
      <ContentWrapper>
        <LogoContainer>
          <Logo src={logo} alt="TrackIt Logo" />
        </LogoContainer>
        
        <FormContainer onSubmit={handleSignUp}>
          <InputContainer>
            <Input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              autoComplete="off"
              required
            />
          </InputContainer>
          
          <InputContainer>
            <Input
              type="password"
              placeholder="senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              autoComplete="new-password"
              required
            />
          </InputContainer>
          
          <InputContainer>
            <Input
              type="text"
              placeholder="nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              autoComplete="off"
              required
            />
          </InputContainer>
          
          <InputContainer>
            <Input
              type="url"
              placeholder="foto (opcional)"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              disabled={loading}
              autoComplete="off"
            />
          </InputContainer>
          
          <CadastrarButton type="submit" disabled={loading}>
            {loading ? (
              <ThreeDots
                height="40"
                width="40"
                radius="9"
                color="#FFFFFF"
                ariaLabel="three-dots-loading"
              />
            ) : (
              'Cadastrar'
            )}
          </CadastrarButton>
          <LoginLink onClick={() => navigate('/login')}>
            Já tem uma conta? Faça login!
          </LoginLink>
        </FormContainer>
      </ContentWrapper>
    </CadastroContainer>
  );
};

const CadastroContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  overflow: hidden;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 375px;
  padding: 0 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LogoContainer = styled.div`
  margin-bottom: 32px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Logo = styled.img`
  width: 180px;
`;

const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const InputContainer = styled.div`
  width: 100%;
  height: 45px;
  margin-bottom: 6px;
`;

const Input = styled.input`
  width: 100% !important;
  height: 45px !important;
  background: #FFFFFF !important;
  border: 1px solid #D4D4D4 !important;
  border-radius: 5px !important;
  padding: 0 11px !important;
  font-size: 20px !important;
  color: #AFAFAF !important;
  box-sizing: border-box !important;
  appearance: none !important;
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  
  &::placeholder {
    color: #DBDBDB !important;
  }
  
  &:disabled {
    background: #F2F2F2 !important;
    color: #AFAFAF !important;
  }
  
  /* Remover o fundo azulado em navegadores webkit */
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
    -webkit-text-fill-color: #AFAFAF !important;
    transition: background-color 5000s ease-in-out 0s !important;
  }
`;

const CadastrarButton = styled.button`
  width: 100%;
  height: 45px;
  background: #52B6FF;
  border-radius: 5px;
  border: none;
  font-size: 21px;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:disabled {
    opacity: 0.7;
  }
`;

const LoginLink = styled.p`
  width: 100%;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  text-decoration-line: underline;
  color: #52B6FF;
  margin-top: 25px;
  cursor: pointer;
`;

export default Cadastro;
