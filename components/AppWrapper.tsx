import { useContext, type ReactNode } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { View } from "react-native";

export function AppWrapper({ children }: { children: ReactNode }) {
    const theme = useContext(ThemeContext);

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