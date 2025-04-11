import React, { createContext, useState } from 'react';

export const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(0);
  const [todayHabits, setTodayHabits] = useState([]);

  const updateProgress = (habits) => {
    if (!habits || habits.length === 0) {
      setProgress(0);
      return;
    }
    
    const completedHabits = habits.filter(habit => habit.done).length;
    const totalHabits = habits.length;
    const calculatedProgress = (completedHabits / totalHabits) * 100;
    
    setProgress(calculatedProgress);
    setTodayHabits(habits);
  };

  return (
    <ProgressContext.Provider value={{ 
      progress, 
      todayHabits, 
      updateProgress 
    }}>
      {children}
    </ProgressContext.Provider>
  );
};
