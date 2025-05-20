import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('AuthContext: Initializing');
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        console.log('AuthContext: Found stored user');
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (err) {
        console.error('AuthContext: Error parsing stored user', err);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (userData) => {
    console.log('AuthContext: Logging in user', userData);
    try {
      // Here you would typically make an API call to verify credentials
      // For now, we'll just store the user data
      const userToStore = {
        ...userData,
        isAuthenticated: true,
        role: userData.role || 'user'
      };
      localStorage.setItem('user', JSON.stringify(userToStore));
      setUser(userToStore);
      return true;
    } catch (err) {
      console.error('AuthContext: Login error', err);
      return false;
    }
  };

  const logout = () => {
    console.log('AuthContext: Logging out user');
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateUser = async (userData) => {
    console.log('AuthContext: Updating user data', userData);
    try {
      // Here you would typically make an API call to update the user
      // For now, we'll just update the stored data
      const updatedUser = {
        ...user,
        ...userData
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      return true;
    } catch (err) {
      console.error('AuthContext: Update user error', err);
      return false;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 