import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types/auth';
import { mockUsers, userCredentials } from '../data/mockUsers';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  users: User[];
  addUser: (user: Omit<User, 'id'>, password: string) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [credentials, setCredentials] = useState(userCredentials);

  // Cargar sesión del localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simular delay de autenticación
    await new Promise(resolve => setTimeout(resolve, 300));

    // Verificar credenciales
    if (credentials[username] === password) {
      const foundUser = users.find(u => u.username === username);
      if (foundUser && foundUser.estado === 'activo') {
        const updatedUser = { 
          ...foundUser, 
          ultimoAcceso: new Date().toLocaleString('es-MX', { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          }).replace(',', '')
        };
        setUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        
        // Actualizar último acceso en la lista de usuarios
        setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
        
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const addUser = (newUser: Omit<User, 'id'>, password: string) => {
    const id = String(users.length + 1);
    const userWithId = { 
      ...newUser, 
      id,
      ultimoAcceso: 'Nunca',
    };
    setUsers(prev => [...prev, userWithId]);
    setCredentials(prev => ({ ...prev, [newUser.username]: password }));
  };

  const updateUser = (id: string, updates: Partial<User>) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updates } : u));
    
    // Si estamos actualizando el usuario actual, también actualizar el estado
    if (user?.id === id) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
  };

  const deleteUser = (id: string) => {
    const userToDelete = users.find(u => u.id === id);
    if (userToDelete) {
      setUsers(prev => prev.filter(u => u.id !== id));
      // Eliminar credenciales
      const newCredentials = { ...credentials };
      delete newCredentials[userToDelete.username];
      setCredentials(newCredentials);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      users,
      addUser,
      updateUser,
      deleteUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
