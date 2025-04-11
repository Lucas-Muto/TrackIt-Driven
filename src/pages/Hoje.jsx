import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { getTodayHabits, checkHabit, uncheckHabit } from '../services/habitService';
import { UserContext } from '../contexts/UserContext';
import { ProgressContext } from '../contexts/ProgressContext';
import { getToken } from '../services/authHelper';

const Hoje = () => {
  const { user } = useContext(UserContext);
  const { progress, updateProgress } = useContext(ProgressContext);
  const [todayHabits, setTodayHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Configurar dayjs para usar o locale pt-br
  dayjs.locale('pt-br');
  
  // Formatar a data de hoje
  const today = dayjs().format('dddd, DD/MM');
  const todayCapitalized = today.charAt(0).toUpperCase() + today.slice(1);
  
  useEffect(() => {
    loadTodayHabits();
  }, []);
  
  const loadTodayHabits = async () => {
    try {
      const token = getToken();
      const response = await getTodayHabits(token);
      setTodayHabits(response.data);
      updateProgress(response.data);
    } catch (error) {
      console.error('Erro ao carregar hábitos de hoje:', error);
      alert('Erro ao carregar seus hábitos de hoje. Tente novamente mais tarde.');
    }
  };
  
  const handleToggleHabit = async (habit) => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    try {
      const token = getToken();
      
      if (habit.done) {
        await uncheckHabit(habit.id, token);
      } else {
        await checkHabit(habit.id, token);
      }
      
      // Recarregar hábitos após marcar/desmarcar
      await loadTodayHabits();
    } catch (error) {
      console.error('Erro ao marcar/desmarcar hábito:', error);
      alert('Erro ao atualizar o hábito. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const getProgressText = () => {
    if (progress === 0) {
      return 'Nenhum hábito concluído ainda';
    }
    return `${progress.toFixed(0)}% dos hábitos concluídos`;
  };
  
  return (
    <Container>
      <Header>
        <Title>{todayCapitalized}</Title>
        <Subtitle progress={progress}>{getProgressText()}</Subtitle>
      </Header>
      
      {todayHabits.length === 0 ? (
        <NoHabits>Você não tem nenhum hábito para hoje.</NoHabits>
      ) : (
        todayHabits.map((habit) => (
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
              disabled={isLoading}
            >
              <i className="fas fa-check"></i>
            </CheckButton>
          </HabitCard>
        ))
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Header = styled.div`
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 22px;
  color: #126BA5;
  margin-bottom: 5px;
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: ${props => props.progress > 0 ? '#8FC549' : '#BABABA'};
`;

const NoHabits = styled.p`
  font-size: 18px;
  color: #666666;
`;

const HabitCard = styled.div`
  background-color: white;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HabitInfo = styled.div`
  flex: 1;
`;

const HabitName = styled.h3`
  font-size: 20px;
  color: #666666;
  margin: 0 0 10px 0;
`;

const SequenceInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const SequenceText = styled.p`
  font-size: 13px;
  color: #666666;
  margin: 0;
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
