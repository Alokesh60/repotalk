import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User, AuthState } from '../types/auth.types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, username: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  updateUsername: (username: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('repotalk_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('repotalk_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Demo mode - simulate login
      const demoUser: User = {
        id: 'demo-user-' + Date.now(),
        email,
        username: email.split('@')[0],
        createdAt: new Date(),
      };
      
      setUser(demoUser);
      localStorage.setItem('repotalk_user', JSON.stringify(demoUser));
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, username: string) => {
    setIsLoading(true);
    try {
      // Demo mode - simulate signup
      const newUser: User = {
        id: 'user-' + Date.now(),
        email,
        username,
        createdAt: new Date(),
      };
      
      setUser(newUser);
      localStorage.setItem('repotalk_user', JSON.stringify(newUser));
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      // Demo mode - simulate Google login
      const googleUser: User = {
        id: 'google-user-' + Date.now(),
        email: 'user@gmail.com',
        username: 'GoogleUser',
        avatar: 'https://ui-avatars.com/api/?name=Google+User&background=4F46E5&color=fff',
        createdAt: new Date(),
      };
      
      setUser(googleUser);
      localStorage.setItem('repotalk_user', JSON.stringify(googleUser));
    } catch (error) {
      console.error('Google login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('repotalk_user');
    localStorage.removeItem('repotalk_conversations');
  };

  const updateUsername = async (username: string) => {
    if (!user) return;
    
    const updatedUser = { ...user, username };
    setUser(updatedUser);
    localStorage.setItem('repotalk_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        loginWithGoogle,
        logout,
        updateUsername,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Made with Bob
