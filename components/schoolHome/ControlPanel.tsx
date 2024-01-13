import { Link } from "@react-navigation/native";
import { TouchableNativeFeedback, View, Text } from "react-native";
import { useGlobalStore } from "../../state/GlobalStore";
import { Settings } from "react-native-feather";
import { Centered, CenteredView } from "../../styles/styles";
import styled from "styled-components/native";
import { useThemeContext } from "../../styles/ThemeContext";

let size = 36.5;
let borderRadius = 11;

let color = "#515151";

const ControlPanelOuter = styled.View`
    ${Centered}
    flex-direction: row;
    width: 305px;
    margin: 20px;
`
const VersionText = styled.Text`
    color: ${({theme})=>theme.colors.foreground};
    font-size: 16px;
    opacity: 0.9;
`
const SettingsButton = styled.View`
    ${Centered}
    background-color: ${props=>props.theme.colors.lighterElement};
    border-radius: ${borderRadius}px;
    width: ${size}px;
    height: ${size}px;
`
const VersionOuterContainer = styled.View`
    border-radius: ${borderRadius}px;
    overflow: hidden;
    flex: 1;
    margin-right: 7px;
`
const VersionInnerContainer = styled.View`
    ${Centered}
    height: ${size}px;
    padding: 0 20px;
    background-color: ${props=>props.theme.colors.lighterElement};
`

export function ControlPanel(){

    const versions = useGlobalStore(state=>state.versions);
    const theme = useThemeContext();

    if (!versions || !versions.current) {
        return <></>
    }
    
    return <CenteredView>
        <ControlPanelOuter>
            <VersionOuterContainer>
                <TouchableNativeFeedback>
                    <VersionInnerContainer>
                        <VersionText
                            numberOfLines={1}
                        >{versions.current.text}</VersionText>
                    </VersionInnerContainer>
                </TouchableNativeFeedback>
            </VersionOuterContainer>
            <Link to={"/"}>
                <SettingsButton>
                    <Settings width={18} color={theme.colors.foreground} style={{opacity: 0.9}} />
                </SettingsButton>
            </Link>
        </ControlPanelOuter>
    </CenteredView>
}