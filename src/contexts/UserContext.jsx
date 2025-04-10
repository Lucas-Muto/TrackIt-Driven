import React, { createContext, useState, useEffect } from 'react';
import { getToken } from '../services/authHelper';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getToken();
    console.log("Token:", token);
    if (token) {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      console.log("Stored User:", storedUser);
      if (storedUser) {
        setUser(storedUser);
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
