import { createContext, FC, useState, useEffect, ReactNode } from 'react';

enum Theme {
  Light,
  Dark,
}

interface ThemeContextIF {
  theme: Theme | null;
  setTheme: (val: Theme) => void;
}

const initValue: ThemeContextIF = {
  theme: Theme.Light,
  setTheme: (val: Theme) => {},
};

const ThemeContext = createContext<ThemeContextIF>(initValue);

interface ThemeContextProviderProps {
  children: ReactNode;
}

const ThemeContextProvider: FC<ThemeContextProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme | null>(null);

  const windowThemeChanger = (event: MediaQueryListEvent) => {
    setTheme(event.matches ? Theme.Dark : Theme.Light);
  };

  useEffect(() => {
    const fromStorage = localStorage.getItem('theme');

    console.log(fromStorage);
    if (fromStorage === null) {
      setTheme(
        window.matchMedia('(prefers-color-scheme: dark)').matches
          ? Theme.Dark
          : Theme.Light,
      );
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', windowThemeChanger);
    } else {
      setTheme(fromStorage === 'dark' ? Theme.Dark : Theme.Light);
    }

    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', windowThemeChanger);
    };
  }, []);

  useEffect(() => {
    if (theme !== null) {
      localStorage.setItem('theme', theme ? 'dark' : 'light');
      document.documentElement.dataset.mode = theme ? 'dark' : 'light';
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeContextProvider, Theme };
