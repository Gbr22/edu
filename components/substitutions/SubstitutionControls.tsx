import { TouchableNativeFeedback } from "react-native";
import styled from "styled-components/native";
import { ChevronLeft, ChevronRight } from "react-native-feather";
import { Centered } from "../../styles/styles";
import { useThemeContext } from "../../styles/ThemeContext";
import { substitutionsState } from "../../state/substitutionsState";
import { NativeModules } from "react-native";

let borderRadius = 11;
let size = 36.5;

const ArrowButtonOuterContainer = styled.View`
    background-color: ${props=>props.theme.colors.lighterElement};
    border-radius: ${borderRadius}px;
    overflow: hidden;
`

const ArrowButtonInnerContainer = styled.View`
    ${Centered}
    width: ${size}px;
    height: ${size}px;
`

function ArrowButton(props: { direction: number }){
    const theme = useThemeContext();

    const Icon = props.direction === -1 ? ChevronLeft : ChevronRight;

    return <ArrowButtonOuterContainer>
        <TouchableNativeFeedback
            onPress={substitutionsState.stepDateByDays.bind(null,props.direction)}
        >
            <ArrowButtonInnerContainer>
                <Icon width={20} height={20} color={theme.colors.foreground} style={{opacity: 0.9}} />
            </ArrowButtonInnerContainer>
        </TouchableNativeFeedback>
    </ArrowButtonOuterContainer>
}

const DateOuterContainer = styled.View`
    border-radius: ${borderRadius}px;
    overflow: hidden;
    flex: 1;
`
const DateInnerContainer = styled.View`
    ${Centered}
    height: ${size}px;
    padding: 0 20px;
    background-color: ${props=>props.theme.colors.lighterElement};
`
const DateText = styled.Text`
    color: ${({theme})=>theme.colors.foreground};
    font-size: 16px;
    opacity: 0.9;
`

const ControlContainer = styled.View`
    flex-direction: row;
    gap: 7px;
    padding: 20px;
    padding-bottom: 0;
`

function toLocalDate(date: Date){
    return date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' });
}

function DateButton(){
    const state = substitutionsState.use();

    return <DateOuterContainer>
        <TouchableNativeFeedback>
            <DateInnerContainer>
                <DateText
                    numberOfLines={1}
                >{toLocalDate(state.date)}</DateText>
            </DateInnerContainer>
        </TouchableNativeFeedback>
    </DateOuterContainer>
}

export function SubstitutionControls(){
    return <ControlContainer>
        <ArrowButton direction={-1} />
        <DateButton />
        <ArrowButton direction={+1} />
    </ControlContainer>
}