import { type Theme as NavigationTheme } from '@react-navigation/native';

type ThemeColors = {
    [key in (
        | "background"
        | "foreground"
        | "statusBar"
        | "primary"
        | "error"
        | "lightElement"
        | "lighterElement"
        | "modalBackdrop"
        | "borderColor"
        | "navForegroundActive"
        | "navBackground"
        | "glassBackground"
    )]: string
}

export interface Theme {
    isDark: boolean
    colors: ThemeColors,
    navigation: NavigationTheme
}
