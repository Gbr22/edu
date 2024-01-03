export const lightTheme = {
    isDark: false,
    colors: {
        background: "#ffffff",
        statusBar: "rgba(255,255,255,0.8)",
        primary: "#2aa2a2",
        error: "#d74942",
        lightElement: "#e6e6e6",
        lighterElement: "#ededed"
    },
};

// TODO: darkTheme

export type Theme = typeof lightTheme;