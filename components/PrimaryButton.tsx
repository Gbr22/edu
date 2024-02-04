import { Button, SpecializedButtonProps } from "./Button";
import { useThemeContext } from "../styles/ThemeContext";

export function PrimaryButton(props: SpecializedButtonProps){
    let theme = useThemeContext();
    return <Button
        {...props}
        backgroundColor={theme.colors.primary}
        color="#fff"
    />
}