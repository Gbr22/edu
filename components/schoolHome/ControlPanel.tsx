import { Link } from "@react-navigation/native";
import { TouchableNativeFeedback, View, Text } from "react-native";
import { useGlobalStore } from "../../state/GlobalStore";
import FeatherIcons from '@expo/vector-icons/Feather';
import { Centered, CenteredView } from "../../styles/styles";
import styled from "../../styles/styled-components";

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
    color: ${color};
    font-size: 16px;
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

    let versions = useGlobalStore(state=>state.versions);

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
                    <FeatherIcons name="settings" size={18} color={color}></FeatherIcons>
                </SettingsButton>
            </Link>
        </ControlPanelOuter>
    </CenteredView>
}