import React, { useContext, useEffect } from 'react';
import { Navigate, Link, useLocation } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { getToken } from '../services/authHelper';
import styled from 'styled-components';
import habitosIcon from '../assets/habitos.svg';
import hojeIcon from '../assets/hoje.svg';

const ProtectedRoute = ({ element }) => {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation(); // Hook para obter a localização atual
  
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
  
  return (
    <PageContainer>
      <TopBar>
        <Logo>TrackIt</Logo>
        {user && <UserAvatar src={user.image} alt={user.name} />}
      </TopBar>
      
      <ContentContainer>
        {element}
      </ContentContainer>
      
      <NavBar>
        <NavButton 
          to="/habitos"
          isActive={location.pathname === '/habitos'}
        >
          <img src={habitosIcon} alt="Hábitos" />
          <span>Hábitos</span>
        </NavButton>
        <NavButton 
          to="/hoje"
          isActive={location.pathname === '/hoje'}
        >
          <img src={hojeIcon} alt="Hoje" />
          <span>Hoje</span>
        </NavButton>
      </NavBar>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #F2F2F2;
  width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow-x: hidden;
  position: relative;
`;

const TopBar = styled.header`
  height: 70px;
  background-color: #126BA5;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;

const Logo = styled.h1`
  font-family: 'Playball', cursive;
  font-size: 38px;
  color: white;
`;

const UserAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const ContentContainer = styled.main`
  flex: 1;
  margin-top: 70px;
  margin-bottom: 70px;
  padding: 0;
  width: 100vw;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #F2F2F2;
  box-sizing: border-box;
`;

const NavBar = styled.nav`
  height: 70px;
  background-color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.05);
  padding: 0;
  margin: 0;
  width: 100%;
`;

const NavButton = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 18px;
  width: 50%;
  height: 100%;
  padding: 0 15px;
  box-sizing: border-box;
  gap: 10px;
  background-color: ${props => props.isActive ? '#52B6FF' : 'white'};
  color: ${props => props.isActive ? 'white' : '#D4D4D4'};
  
  img {
    height: 24px;
    filter: ${props => props.isActive 
      ? 'brightness(0) invert(1)' /* Para branco quando ativo */
      : 'brightness(0) saturate(100%) invert(83%) sepia(8%) saturate(0%) hue-rotate(153deg) brightness(89%) contrast(90%)' /* #D4D4D4 exato */
    };
  }
  
  span {
    font-weight: 400;
  }
`;

export default ProtectedRoute;
