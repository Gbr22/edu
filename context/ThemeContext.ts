import { createContext } from 'react';
import { lightTheme, type Theme } from "../styles/theme"; 

export const ThemeContext = createContext<Theme>(lightTheme);
