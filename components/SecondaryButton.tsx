import { useContext } from "react";
import { ThemeContext } from "../styles/useTheme";
import { Button, SpecializedButtonProps } from "./Button";

export function SecondaryButton(props: SpecializedButtonProps){

    let theme = useContext(ThemeContext);

    return <Button
        {...props}
        backgroundColor={theme.colors.lightElement}
        color="#000"
    />
}