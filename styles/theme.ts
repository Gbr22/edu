import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

export const lightTheme = {
    isDark: false,
    colors: {
        background: "#ffffff",
        foreground: "#000000",
        statusBar: "rgba(255,255,255,0.8)",
        primary: "#2aa2a2",
        error: "#d74942",
        lightElement: "#e6e6e6",
        lighterElement: "#ededed"
    },
    navigation: {
        ...DefaultTheme,
        dark: false,
        colors: {
            ...DefaultTheme.colors,
            primary: '#2aa2a2',
            background: '#ffffff',
            card: '#e6e6e6',
            text: '#000000',
            border: 'rgb(199, 199, 204)',
            notification: 'rgb(255, 69, 58)',
        },
    }
};

// TODO: darkTheme

export type Theme = typeof lightTheme;