import { DarkTheme as NavigationDark } from '@react-navigation/native';
import { type Theme } from './theme';

export const darkTheme = {
    isDark: true,
    colors: {
        background: "#18181b",
        navBackground: "#242429",
        foreground: "#e4e4e7",
        statusBar: "rgba(24, 24, 27, 0.8)",
        primary: "#1f7a7a",
        navForegroundActive: "#0074D9",
        error: "#99413d",
        lightElement: "#27272a",
        lighterElement: "#3f3f46",
        modalBackdrop: "rgba(0, 0, 0, 0.6)",
        borderColor: "#34343a"
    },
    navigation: {
        ...NavigationDark,
        dark: false,
        colors: {
            ...NavigationDark.colors,
            primary: '#2aa2a2',
            background: '#18181b',
        },
    }
} as const satisfies Theme;