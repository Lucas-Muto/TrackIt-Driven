import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { getTodayHabits, checkHabit, uncheckHabit } from '../services/habitService';
import { UserContext } from '../contexts/UserContext';
import { ProgressContext } from '../contexts/ProgressContext';
import { getToken } from '../services/authHelper';
import { ThreeDots } from 'react-loader-spinner';

const Hoje = () => {
  const { user } = useContext(UserContext);
  const { progress, updateProgress } = useContext(ProgressContext) || { progress: 0, updateProgress: () => {} };
  const [todayHabits, setTodayHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingHabits, setLoadingHabits] = useState({});
  const [apiError, setApiError] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  
  // Configurar dayjs para usar o locale pt-br
  dayjs.locale('pt-br');
  
  // Formatar a data de hoje
  const today = dayjs().format('dddd, DD/MM');
  const todayCapitalized = today.charAt(0).toUpperCase() + today.slice(1);
  
  useEffect(() => {
    loadTodayHabits(true);
  }, []);
  
  const loadTodayHabits = async (isInitialLoad = false) => {
    try {
      if (isInitialLoad) {
        setInitialLoading(true);
      }
      setIsLoading(true);
      const token = getToken();
      
      const response = await getTodayHabits(token);
      
      setTodayHabits(response.data);
      updateProgress(response.data);
      setApiError(null);
    } catch (error) {
      console.error('Erro ao carregar hábitos de hoje:', error);
      setApiError(error.message || 'Erro ao carregar seus hábitos de hoje.');
      // Não mostrar alert para não interromper a experiência do usuário
    } finally {
      setIsLoading(false);
      if (isInitialLoad) {
        setInitialLoading(false);
      }
    }
  };
  
  const handleToggleHabit = async (habit) => {
    if (loadingHabits[habit.id]) return;
    
    setLoadingHabits(prev => ({ ...prev, [habit.id]: true }));
    
    try {
      const token = getToken();
      
      if (habit.done) {
        await uncheckHabit(habit.id, token);
      } else {
        await checkHabit(habit.id, token);
      }
      
      // Recarregar hábitos após marcar/desmarcar
      await loadTodayHabits(false);
    } catch (error) {
      console.error('Erro ao marcar/desmarcar hábito:', error);
      alert('Erro ao atualizar o hábito. Tente novamente mais tarde.');
    } finally {
      setLoadingHabits(prev => ({ ...prev, [habit.id]: false }));
    }
  };
  
  return (
    <Container>
      <InnerContainer>
        <Header>
          <Title>{todayCapitalized}</Title>
        </Header>
        
        {initialLoading && <Loading>Carregando hábitos...</Loading>}
        
        {apiError && (
          <ErrorMessage>
            Erro ao carregar hábitos: {apiError}
            <RetryButton onClick={() => loadTodayHabits(true)}>Tentar novamente</RetryButton>
          </ErrorMessage>
        )}
        
        {!initialLoading && !apiError && todayHabits.length === 0 && (
          <NoHabits>Você não tem nenhum hábito para hoje.</NoHabits>
        )}
        
        {todayHabits.map((habit) => (
          <HabitCard key={habit.id}>
            <HabitInfo>
              <HabitName>{habit.name}</HabitName>
              <SequenceInfo>
                <SequenceText>
                  Sequência atual: <CurrentSequence done={habit.done}>{habit.currentSequence} dias</CurrentSequence>
                </SequenceText>
                <SequenceText>
                  Seu recorde: <RecordSequence done={habit.done} record={habit.currentSequence >= habit.highestSequence && habit.highestSequence > 0}>
                    {habit.highestSequence} dias
                  </RecordSequence>
                </SequenceText>
              </SequenceInfo>
            </HabitInfo>
            <CheckButton 
              done={habit.done} 
              onClick={() => handleToggleHabit(habit)}
              disabled={loadingHabits[habit.id]}
            >
              {loadingHabits[habit.id] ? (
                <ThreeDots
                  height="13"
                  width="51"
                  radius="9"
                  color="#FFFFFF"
                  ariaLabel="three-dots-loading"
                />
              ) : (
                <i className="fas fa-check"></i>
              )}
            </CheckButton>
          </HabitCard>
        ))}
      </InnerContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  margin: 0;
  background-color: #F2F2F2;
`;

const InnerContainer = styled.div`
  width: 100%;
  max-width: 390px;
  padding: 0 16px;
  box-sizing: border-box;
  
  @media (min-width: 600px) {
    max-width: 470px;
  }
  
  @media (min-width: 768px) {
    max-width: 540px;
  }
  
  @media (min-width: 1024px) {
    max-width: 600px;
  }
`;

const Header = styled.div`
  margin-bottom: 30px;
  width: 100%;
  text-align: left;
  padding: 0;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 23px;
  color: #126BA5;
  margin-bottom: 5px;
  text-align: left;
  padding: 0;
  margin-top: 0;
`;

const Loading = styled.p`
  font-size: 18px;
  color: #666666;
  text-align: center;
  margin-top: 20px;
`;

const ErrorMessage = styled.div`
  background-color: #ffebee;
  color: #c62828;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RetryButton = styled.button`
  background-color: #c62828;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  font-size: 14px;
  align-self: flex-end;
  cursor: pointer;
`;

const NoHabits = styled.p`
  font-size: 18px;
  color: #666666;
  text-align: left;
  width: 100%;
  padding: 0;
`;

const HabitCard = styled.div`
  background-color: white;
  border-radius: 5px;
  padding: 18px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
`;

const HabitInfo = styled.div`
  flex: 1;
  text-align: left;
`;

const HabitName = styled.h3`
  font-size: 20px;
  color: #666666;
  margin: 0 0 10px 0;
  text-align: left;
`;

const SequenceInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: left;
`;

const SequenceText = styled.p`
  font-size: 13px;
  color: #666666;
  margin: 0;
  text-align: left;
`;

const CurrentSequence = styled.span`
  color: ${props => props.done ? '#8FC549' : '#666666'};
`;

const RecordSequence = styled.span`
  color: ${props => props.done && props.record ? '#8FC549' : '#666666'};
`;

const CheckButton = styled.button`
  width: 70px;
  height: 70px;
  background-color: ${props => props.done ? '#8FC549' : '#EBEBEB'};
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export default Hoje;
