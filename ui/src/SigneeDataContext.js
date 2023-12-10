// SigneeDataContext.js

import React, { createContext, useContext, useState } from 'react';

const SigneeDataContext = createContext();

export const useSigneeData = () => {
  return useContext(SigneeDataContext);
};

export const SigneeDataProvider = ({ children }) => {
  const [requestingStudents, setRequestingStudents] = useState([]);
  const [user, setUser] = useState(null);

  const login = (username) => {
    setUser({ username });
  };

  const logout = () => {
    setUser(null);
  };

  const updateRequestingStudents = (studentName, signeeName) => {
    setRequestingStudents([...requestingStudents, { studentName, signeeName }]);
  };

  return (
    <SigneeDataContext.Provider value={{ requestingStudents, updateRequestingStudents, user, login, logout }}>
      {children}
    </SigneeDataContext.Provider>
  );
};
