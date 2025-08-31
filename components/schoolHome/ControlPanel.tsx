import { Link } from "@react-navigation/native";
import { TouchableNativeFeedback, View, Text } from "react-native";
import { useGlobalStore } from "../../state/GlobalStore";
import { Settings } from "react-native-feather";
import { Centered, CenteredView } from "../../styles/styles";
import styled from "styled-components/native";
import { useThemeContext } from "../../styles/ThemeContext";
import { useFontScale } from "../../fontScale";
import { useClassSize, useControlPanelSizes } from "../viewer/Sizes";

const ControlPanelOuter = styled.View`
    ${Centered}
    flex-direction: row;
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
`
const VersionOuterContainer = styled.View`
    overflow: hidden;
    flex: 1;
    margin-right: 7px;
`
const VersionInnerContainer = styled.View`
    ${Centered}
    padding: 0 20px;
    background-color: ${props=>props.theme.colors.lighterElement};
`

export function ControlPanel(){
    const { height, borderRadius } = useControlPanelSizes();
    const fontScale = useFontScale();
    const { versions } = useGlobalStore();
    const theme = useThemeContext();
    const classSize = useClassSize();
    const width = classSize.size * 3 + 20 * 2;

    if (!versions || !versions.current) {
        return <></>
    }
    
    return <CenteredView
        style={{
            paddingHorizontal: 20
        }}
    >
        <ControlPanelOuter
            style={{
                width,
                maxWidth: '100%',
            }}
        >
            <VersionOuterContainer
                style={{
                    borderRadius,
                }}
            >
                <TouchableNativeFeedback>
                    <VersionInnerContainer
                        style={{
                            height
                        }}
                    >
                        <VersionText
                            numberOfLines={1}
                        >{versions.current.text}</VersionText>
                    </VersionInnerContainer>
                </TouchableNativeFeedback>
            </VersionOuterContainer>
            <Link screen={"Home"} params={{}}>
                <SettingsButton
                    style={{
                        height,
                        width: height,
                        borderRadius,
                    }}
                >
                    <Settings width={18 * fontScale} color={theme.colors.foreground} style={{opacity: 0.9}} />
                </SettingsButton>
            </Link>
        </ControlPanelOuter>
    </CenteredView>
}