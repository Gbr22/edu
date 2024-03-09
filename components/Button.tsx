import { TouchableNativeFeedback } from "react-native";
import * as FeatherIconsNamespace from "react-native-feather";
import styled from "styled-components/native";
import { Centered } from "../styles/styles";

const FeatherIcons = {...FeatherIconsNamespace};

type FeatherIconsName = keyof typeof FeatherIcons;

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
    icon: (p: { color: string, width: number, height: number })=>any
    text: string
}

interface ButtonProps {
    onPress: ()=>void
    icon: (p: { color: string, width: number, height: number })=>any
    text: string
    backgroundColor: string
    color: string
}

export function Button({onPress, icon, text, backgroundColor, color}: ButtonProps){
    let Icon = icon;
    return <OuterContainer backgroundColor={backgroundColor}>
        <TouchableNativeFeedback
            onPress={onPress}
        >
            <InnerContainer>
                <Icon color={color} width={25} height={25} />
                <ButtonText color={color}>{text}</ButtonText>
            </InnerContainer>
        </TouchableNativeFeedback>
    </OuterContainer>
}