import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [loginEmail, setLoginEmail] = useState(null);
  const [loginUserName, setLoginUserName] = useState(null);

  return (
    <AuthContext.Provider value={{ loginEmail, setLoginEmail, loginUserName, setLoginUserName }}>
      {children}
    </AuthContext.Provider>
  );
};
