import { ReactNode, createContext, useCallback, useState } from 'react';

interface ThemeProps {
  children: ReactNode;
}

interface ThemeContextProps {
  theme: string;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: 'light',
  toggleMode: () => {},
});

export const ThemeContextProvider = ({ children }: ThemeProps) => {
  const [theme, setTheme] = useState<string>(
    window.localStorage.getItem('theme') || 'light',
  );

  const toggleMode = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    window.localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeContext;
