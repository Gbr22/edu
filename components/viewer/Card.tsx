import { View, Text, TouchableNativeFeedback } from 'react-native';
import { getCardColor } from "../../styles/styles";
import { CardData, getShortClassroomText, getGroupText, getTeacherText, isPlaceholderCardData, PlaceholderCardData, isCardData } from "../../data/cards";
import { useLessonModalStore } from "./LessonModal";
import styled from "styled-components/native";
import { Sizes } from './Sizes';
import { DAY, getWeekStart, truncateTime } from '../../localization/date';
import { useGlobalStore } from '../../state/GlobalStore';
import { substitutionsState, matchSubstitutionsForLesson } from '../../state/substitutionsState';
import { getPeriodInfo } from '../../data/periods';
import { AlertCircle } from 'react-native-feather';
import { Substitutions } from '../../data/substitution';
import { useThemeContext } from '../../styles/ThemeContext';

const Placeholder = styled.View`
    margin-right: ${Sizes.gap}px;
    flex: 1;
    z-index: 0;
`
const CardText = styled.Text<{ align: "left" | "right" | "center" }>`
    font-size: 14px;
    line-height: 14px;
    color: ${({theme})=>theme.colors.foreground};
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
    dayId: string
    classId: string
    periodId: string
    substitutions: Substitutions | null
}

const TeacherContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
`

export function Card({card, dayId, classId, substitutions}: Props) {
    if (!isCardData(card)) {
        return <Placeholder />
    }
    const theme = useThemeContext();
    const {lesson, subject} = card;
    const duration = lesson.duration || 1;
    const { timetable } = useGlobalStore();
    const periods = timetable?.periods || [];
    const classes = timetable?.classes || [];
    const { periodText } = getPeriodInfo({
        periods: periods,
        periodId: card.entry.periodId,
        duration: card.lesson.duration
    })
    const substitution = matchSubstitutionsForLesson({
        classId,
        classes,
        substitutions,
        periodText
    });
    
    return <CardOuter
        height={duration}
        card={card}
    >
        <TouchableNativeFeedback
            onPress={()=>{
                useLessonModalStore.getState().show({
                    cardData: card,
                    periodInfo: substitution
                });
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
                <TeacherContainer>
                    { substitution &&
                        <AlertCircle
                            width={14}
                            height={14}
                            color={theme.colors.foreground}
                            style={{
                                position: "relative",
                                bottom: 2,
                                right: 3
                            }}
                        />
                    }
                    <CardText
                        align="right"
                        numberOfLines={1}
                    >{getTeacherText(card)}</CardText>
                </TeacherContainer>
            </CardInner>
        </TouchableNativeFeedback>
    </CardOuter>
}