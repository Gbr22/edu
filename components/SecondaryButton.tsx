import { Button, SpecializedButtonProps } from "./Button";
import { useThemeContext } from "../styles/ThemeContext";

export function SecondaryButton(props: SpecializedButtonProps){
    let theme = useThemeContext();

    return <Button
        {...props}
        backgroundColor={theme.colors.lightElement}
        color={theme.colors.foreground}
    />
}