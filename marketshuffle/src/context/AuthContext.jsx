import { createContext, useState } from 'react';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  // TODO use firebase
  const [auth, setAuth] = useState({ token: '', user: null });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}