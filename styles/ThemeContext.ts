import { createContext, useContext } from 'react';
import { type Theme } from "./theme"; 
import { lightTheme } from './lightTheme';

export const ThemeContext = createContext<Theme>(lightTheme);
export function useThemeContext(){
    return useContext(ThemeContext);
}