import { useContext } from "react";
import { ThemeContext } from "../styles/useTheme";
import { Button, SpecializedButtonProps } from "./Button";

export function PrimaryButton(props: SpecializedButtonProps){
    let theme = useContext(ThemeContext);
    return <Button
        {...props}
        backgroundColor={theme.colors.primary}
        color="#fff"
    />
}