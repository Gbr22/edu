import { TouchableNativeFeedback, View, Text } from "react-native";
import * as FeatherIcons from "react-native-feather";
import styled from "styled-components/native";
import { Centered } from "../styles/styles";

type FeatherIconsName = keyof FeatherIcons;

const OuterContainer = styled.View<{ backgroundColor: string }>`
    background-color: ${props=>props.backgroundColor};
    border-radius: 12px;
    overflow: hidden;
`
const InnerContainer = styled.View`
    ${Centered}
    height: 45px;
    flex-direction: row;
    padding: 0 12px;
`
const ButtonText = styled.Text<{ color: string }>`
    color: ${props=>props.color};
    font-weight: bold;
    font-size: 16px;
    margin-left: 7px;
`

export interface SpecializedButtonProps {
    onPress: ()=>void
    icon: FeatherIconsName
    text: string
}

interface ButtonProps {
    onPress: ()=>void
    icon: FeatherIconsName
    text: string
    backgroundColor: string
    color: string
}

export function Button({onPress, icon, text, backgroundColor, color}: ButtonProps){
    let Icon = FeatherIcons[icon];
    return <OuterContainer backgroundColor={backgroundColor}>
        <TouchableNativeFeedback
            onPress={onPress}
        >
            <InnerContainer>
                <Icon color={color} size={25} />
                <ButtonText color={color}>{text}</ButtonText>
            </InnerContainer>
        </TouchableNativeFeedback>
    </OuterContainer>
}