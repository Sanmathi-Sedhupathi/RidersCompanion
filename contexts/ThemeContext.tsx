import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Theme {
  background: string;
  surface: string;
  primary: string;
  secondary: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
}

export const lightTheme: Theme = {
  background: '#FFFFFF',
  surface: '#F5F5F5',
  primary: '#B71D1D',
  secondary: '#0A84FF',
  textPrimary: '#1C1C1E',
  textSecondary: '#6C6C6C',
  border: '#E0E0E0',
};

export const darkTheme: Theme = {
  background: '#121212',
  surface: '#1E1E1E',
  primary: '#B71D1D',
  secondary: '#30D158',
  textPrimary: '#FFFFFF',
  textSecondary: '#A0A0A0',
  border: '#2C2C2E',
};

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}