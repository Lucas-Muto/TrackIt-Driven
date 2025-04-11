import React, { useContext, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { getToken } from '../services/authHelper';
import styled from 'styled-components';

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
        <StyledLink to="/habitos">
          <i className="fas fa-list-ul"></i>
          Hábitos
        </StyledLink>
        <StyledLink to="/hoje" className="active">
          <i className="fas fa-calendar-check"></i>
          Hoje
        </StyledLink>
      </NavBar>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #F2F2F2;
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
  padding: 15px;
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
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #52B6FF;
  font-size: 14px;
  
  i {
    font-size: 24px;
    margin-bottom: 4px;
  }
  
  &.active {
    color: #126BA5;
  }
`;

export default ProtectedRoute;
