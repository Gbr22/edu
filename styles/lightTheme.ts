import { DefaultTheme as NavigationLight } from '@react-navigation/native';
import { type Theme } from './theme';
import Color from 'color';

export const lightTheme = {
    isDark: false,
    colors: {
        background: "#ffffff",
        glassBackground: Color("#ffffff").alpha(0.9).string(),
        navBackground: "#f2f2f2",
        foreground: "#000000",
        statusBar: "rgba(255,255,255,0.8)",
        primary: "#2aa2a2",
        navForegroundActive: "#0074D9",
        error: "#d74942",
        lightElement: "#e6e6e6",
        lighterElement: "#ededed",
        modalBackdrop: "rgba(255, 255, 255, 0.8)",
        borderColor: "#ECECEC"
    },
    navigation: {
        ...NavigationLight,
        dark: false,
        colors: {
            ...NavigationLight.colors,
            primary: '#2aa2a2',
            background: '#ffffff',
            card: '#e6e6e6',
            text: '#000000',
            border: 'rgb(199, 199, 204)',
            notification: 'rgb(255, 69, 58)',
        },
    }
} as const satisfies Theme;