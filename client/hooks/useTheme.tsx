import { useContext } from 'react';
import { ThemeContext } from '../helpers';

const useTheme = () => {
  const { theme } = useContext(ThemeContext);

  return { theme };
};

export { useTheme };
