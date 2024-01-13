import { type Theme } from "./theme";
import { lightTheme } from "./lightTheme";
import { useColorScheme } from "react-native";
import { darkTheme } from "./darkTheme";

export function useTheme(): Theme {
    const colorScheme = useColorScheme();
    return colorScheme == "dark" ? darkTheme : lightTheme;
}