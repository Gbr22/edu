import * as styledComponents from "styled-components/native";
import { Theme } from "./theme";

// Reexport styled-components with Theme
// see: https://styled-components.com/docs/api#create-a-theme

const {
    default: styled,
    css,
    ThemeProvider,
    ThemeContext
} = styledComponents as unknown as styledComponents.ReactNativeThemedStyledComponentsModule<Theme>;
export { css, ThemeProvider, ThemeContext };
export default styled;