import { ActivityIndicator } from "react-native";
import { CenteredFillView } from "../styles/styles";
import { useThemeContext } from "../styles/ThemeContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function LoadingScreen(){
    const theme = useThemeContext();
    const insets = useSafeAreaInsets();

    return <CenteredFillView
        style={{
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
        }}
    >
        <ActivityIndicator color={theme.colors.foreground} size={"large"} style={{opacity: 0.7}}></ActivityIndicator>
    </CenteredFillView>
}