import { View, Text, TouchableNativeFeedback } from 'react-native';
import { getCardColor } from "../../styles/styles";
import { CardData, getShortClassroomText, getGroupText, getTeacherText, isPlaceholderCardData, PlaceholderCardData, isCardData } from "../../data/cards";
import { useLessonModalStore } from "./LessonModal";
import styled from "../../styles/styled-components";
import { Sizes } from './Sizes';

const Placeholder = styled.View`
    margin-right: ${Sizes.gap}px;
    flex: 1;
    z-index: 0;
`
const CardText = styled.Text<{ align: "left" | "right" | "center" }>`
    font-size: 14px;
    line-height: 14px;
    color: #000;
    text-align: ${props=>props.align};
`
const CardOuter = styled.View<{ height: number, card: CardData }>`
    margin-right: ${Sizes.gap}px;
    flex: 1;
    border-radius: 8.5px;
    overflow: hidden;
    z-index: 1;
    height: ${({height})=>Sizes.rowHeight * height + Sizes.gap * (height-1)}px;
    background-color: ${({card,theme})=>getCardColor(card,theme)};
`
const CardInner = styled.View`
    flex-grow: 1;
    justify-content: space-between;
    padding: 7px;
`
const Row = styled.View`
    flex-direction: row;
`
interface Props {
    card: CardData | PlaceholderCardData
}
export function Card({card}: Props) {
    if (!isCardData(card)) {
        return <Placeholder />
    }

    let {lesson, subject} = card;
    let duration = lesson.duration || 1;

    return <CardOuter
        height={duration}
        card={card}
    >
        <TouchableNativeFeedback
            onPress={()=>{
                useLessonModalStore.getState().show(card);
            }}
        >
            <CardInner>
                <Row>
                    <CardText
                        align="left"
                        style={{flexShrink: 1}}
                        numberOfLines={1}
                    >{getGroupText(card)}</CardText>
                    <CardText
                        align="right"
                        style={{flexGrow: 1}}
                        numberOfLines={1}
                    >{getShortClassroomText(card)}</CardText>
                </Row>
                <CardText
                    align="center"
                    numberOfLines={duration * 2}
                >{subject.name}</CardText>
                <CardText
                    align="right"
                    numberOfLines={1}
                >{getTeacherText(card)}</CardText>
            </CardInner>
        </TouchableNativeFeedback>
    </CardOuter>
}