import { TouchableNativeFeedback } from "react-native";
import styled from "styled-components/native";
import { ChevronLeft, ChevronRight } from "react-native-feather";
import { Centered } from "../../styles/styles";
import { useThemeContext } from "../../styles/ThemeContext";
import { substitutionsState } from "../../state/substitutionsState";
import { useControlPanelSizes } from "../viewer/Sizes";
import { useFontScale } from "../../fontScale";

const ArrowButtonOuterContainer = styled.View`
    background-color: ${props=>props.theme.colors.lighterElement};
    overflow: hidden;
`

const ArrowButtonInnerContainer = styled.View`
    ${Centered}
`

function ArrowButton(props: { direction: number }){
    const theme = useThemeContext();
    const { height, borderRadius } = useControlPanelSizes();
    const fontScale = useFontScale();
    const iconSize = 20 * fontScale;

    const Icon = props.direction === -1 ? ChevronLeft : ChevronRight;

    return <ArrowButtonOuterContainer
        style={{
            borderRadius
        }}
    >
        <TouchableNativeFeedback
            onPress={substitutionsState.stepDateByDays.bind(null,props.direction)}
        >
            <ArrowButtonInnerContainer
                style={{
                    height,
                    width: height,
                }}
            >
                <Icon width={iconSize} height={iconSize} color={theme.colors.foreground} style={{opacity: 0.9}} />
            </ArrowButtonInnerContainer>
        </TouchableNativeFeedback>
    </ArrowButtonOuterContainer>
}

const DateOuterContainer = styled.View`
    overflow: hidden;
    flex: 1;
`
const DateInnerContainer = styled.View`
    ${Centered}
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
    const { height, borderRadius } = useControlPanelSizes();

    return <DateOuterContainer
        style={{
            borderRadius
        }}
    >
        <TouchableNativeFeedback>
            <DateInnerContainer
                style={{
                    height
                }}
            >
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