import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

// maintain the user state and define the
// functions to login and logout
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  // get the current session storage (if it's set)
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const name = sessionStorage.getItem('name');
    const role = sessionStorage.getItem('role');
    const userId = sessionStorage.getItem('userId');

    if (!token || !name || !role || !userId) setUser(null);
    else setUser({ token, name, role, userId });
  }, []);

  // on login
  const login = (token, name, role, userId) => {
    const userDetails = {
      token,
      name,
      role,
      userId,
    };

    setUser(userDetails);
  };

  // clear session on logout
  const logout = () => {
    sessionStorage.clear();
    setUser(null);
  };

  // provide the values
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// returns the value of AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
