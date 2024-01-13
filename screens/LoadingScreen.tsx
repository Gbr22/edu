import { ActivityIndicator } from "react-native";
import { CenteredFillView } from "../styles/styles";
import { useThemeContext } from "../styles/ThemeContext";

export function LoadingScreen(){
    const theme = useThemeContext();

    return <CenteredFillView>
        <ActivityIndicator color={theme.colors.foreground} size={"large"} style={{opacity: 0.7}}></ActivityIndicator>
    </CenteredFillView>
}