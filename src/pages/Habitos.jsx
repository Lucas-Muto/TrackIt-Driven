import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { createHabit, listHabits, deleteHabit } from '../services/habitService';
import { UserContext } from '../contexts/UserContext';
import { getToken } from '../services/authHelper';

const Habitos = () => {
  const { user } = useContext(UserContext);
  const [habits, setHabits] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [habitName, setHabitName] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const weekdays = [
    { id: 0, name: 'D' },
    { id: 1, name: 'S' },
    { id: 2, name: 'T' },
    { id: 3, name: 'Q' },
    { id: 4, name: 'Q' },
    { id: 5, name: 'S' },
    { id: 6, name: 'S' }
  ];

  useEffect(() => {
    loadHabits();
  }, []);

  const loadHabits = async () => {
    try {
      const token = getToken();
      const response = await listHabits(token);
      setHabits(response.data);
    } catch (error) {
      console.error('Erro ao carregar hábitos:', error);
      alert('Erro ao carregar seus hábitos. Tente novamente mais tarde.');
    }
  };

  const toggleDay = (dayId) => {
    if (selectedDays.includes(dayId)) {
      setSelectedDays(selectedDays.filter(id => id !== dayId));
    } else {
      setSelectedDays([...selectedDays, dayId]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (habitName.trim() === '') {
      alert('Por favor, insira um nome para o hábito.');
      return;
    }
    
    if (selectedDays.length === 0) {
      alert('Por favor, selecione pelo menos um dia da semana.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const token = getToken();
      await createHabit({ name: habitName, days: selectedDays }, token);
      
      // Limpar o formulário e escondê-lo
      setHabitName('');
      setSelectedDays([]);
      setShowForm(false);
      
      // Recarregar a lista de hábitos
      loadHabits();
    } catch (error) {
      console.error('Erro ao criar hábito:', error);
      alert('Erro ao criar hábito. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (habitId) => {
    if (window.confirm('Tem certeza que deseja excluir este hábito?')) {
      try {
        const token = getToken();
        await deleteHabit(habitId, token);
        loadHabits();
      } catch (error) {
        console.error('Erro ao excluir hábito:', error);
        alert('Erro ao excluir hábito. Tente novamente mais tarde.');
      }
    }
  };

  const cancelForm = () => {
    setShowForm(false);
  };

  return (
    <Container>
      <Header>
        <h1>Meus hábitos</h1>
        <AddButton onClick={() => setShowForm(true)}>+</AddButton>
      </Header>
      
      {showForm && (
        <FormContainer onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="nome do hábito"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            disabled={isLoading}
          />
          
          <WeekdaysContainer>
            {weekdays.map((day) => (
              <DayButton
                key={day.id}
                type="button"
                selected={selectedDays.includes(day.id)}
                onClick={() => toggleDay(day.id)}
                disabled={isLoading}
              >
                {day.name}
              </DayButton>
            ))}
          </WeekdaysContainer>
          
          <ButtonContainer>
            <CancelButton type="button" onClick={cancelForm} disabled={isLoading}>
              Cancelar
            </CancelButton>
            <SaveButton type="submit" disabled={isLoading}>
              Salvar
            </SaveButton>
          </ButtonContainer>
        </FormContainer>
      )}
      
      {habits.length === 0 && (
        <NoHabits>
          Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!
        </NoHabits>
      )}
      
      {habits.map((habit) => (
        <HabitCard key={habit.id}>
          <HabitHeader>
            <HabitName>{habit.name}</HabitName>
            <DeleteButton onClick={() => handleDelete(habit.id)}>
              <i className="fas fa-trash"></i>
            </DeleteButton>
          </HabitHeader>
          <HabitDays>
            {weekdays.map((day) => (
              <DayIndicator 
                key={day.id} 
                selected={habit.days.includes(day.id)}
              >
                {day.name}
              </DayIndicator>
            ))}
          </HabitDays>
        </HabitCard>
      ))}
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  max-width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  h1 {
    font-size: 22px;
    color: #126BA5;
  }
`;

const AddButton = styled.button`
  width: 40px;
  height: 35px;
  background-color: #52B6FF;
  border-radius: 5px;
  border: none;
  font-size: 27px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const FormContainer = styled.form`
  padding: 15px;
  background-color: white;
  border-radius: 5px;
  margin-bottom: 30px;
`;

const Input = styled.input`
  width: 100%;
  height: 45px;
  border: 1px solid #D4D4D4;
  border-radius: 5px;
  padding: 0 10px;
  font-size: 16px;
  margin-bottom: 10px;
  
  &::placeholder {
    color: #DBDBDB;
  }
  
  &:disabled {
    background-color: #F2F2F2;
  }
`;

const WeekdaysContainer = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 30px;
`;

const DayButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid #D4D4D4;
  font-size: 16px;
  background-color: ${props => props.selected ? '#CFCFCF' : 'white'};
  color: ${props => props.selected ? 'white' : '#DBDBDB'};
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const CancelButton = styled.button`
  border: none;
  background: none;
  font-size: 16px;
  color: #52B6FF;
  cursor: pointer;
  
  &:disabled {
    opacity: 0.7;
  }
`;

const SaveButton = styled.button`
  width: 84px;
  height: 35px;
  background-color: #52B6FF;
  border-radius: 5px;
  border: none;
  font-size: 16px;
  color: white;
  cursor: pointer;
  
  &:disabled {
    opacity: 0.7;
  }
`;

const NoHabits = styled.p`
  font-size: 18px;
  color: #666666;
  line-height: 22px;
`;

const HabitCard = styled.div`
  background-color: white;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 10px;
`;

const HabitHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const HabitName = styled.h3`
  font-size: 20px;
  color: #666666;
  margin: 0;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #666666;
  cursor: pointer;
  font-size: 15px;
`;

const HabitDays = styled.div`
  display: flex;
  gap: 4px;
`;

const DayIndicator = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid #D4D4D4;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  background-color: ${props => props.selected ? '#CFCFCF' : 'white'};
  color: ${props => props.selected ? 'white' : '#DBDBDB'};
`;

export default Habitos;
