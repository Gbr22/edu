import { type ReactNode } from "react";
import { useThemeContext } from "../styles/ThemeContext";
import { View } from "react-native";

export function AppWrapper({ children }: { children: ReactNode }) {
    const theme = useThemeContext();

    return <View
        style={{
            backgroundColor: theme.colors.background,
            height: "100%",
            width: "100%",
        }}
    >
        {children}
    </View>
}