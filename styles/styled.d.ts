import 'styled-components/native';
import { type Theme } from "./theme";

declare module 'styled-components/native' {
    export interface DefaultTheme extends Theme {};
}
