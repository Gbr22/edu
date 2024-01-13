import { createContext } from "react";
import { type Theme, lightTheme } from "./theme";

export const ThemeContext = createContext<Theme>(lightTheme);