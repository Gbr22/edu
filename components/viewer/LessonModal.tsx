import { Modal, View, Text, TouchableWithoutFeedback } from "react-native";
import { create } from "zustand";
import { CardData, getClassroomText, getGroupText, getShortClassroomText, getTeacherText } from "../../data/cards";
import { useGlobalStore } from "../../state/GlobalStore";
import styled from "../../styles/styled-components";
import { Centered, getCardColor } from "../../styles/styles";

const Overlay = styled.View`
    ${Centered}
    flex: 1;
    background-color: rgba(255, 255, 255, 0.8);
`
const InnerContainer = styled.View<{ card: CardData }>`
    border-radius: 18px;
    width: 100%;
    max-width: 266px;
    padding: 18px;
    elevation: 1;
    background-color: ${({card,theme})=>getCardColor(card,theme)};
`
const SubjectText = styled.Text`
    font-size: 19px;
    text-align: center;
`
const QuickInfo = styled.View`
    ${Centered}
    flex-direction: row;
    margin: 12px 0;
`
const PeriodText = styled.Text`
    font-weight: bold;
    font-size: 21px;
    margin-right: 11px;
`

interface LessonModalState {
    cardData?: CardData
    show: (cardData: CardData) => void
    hide: ()=>void
}

export const useLessonModalStore = create<LessonModalState>(set=>({
    cardData: undefined,
    show(cardData){
        set({cardData});
    },
    hide(){
        set({cardData: undefined});
    }
}))

function ModalInner(props: {card: CardData}){
    let { card } = props;
    let timetable = useGlobalStore(state=>state.timetable);

    if (!timetable){
        return <></>
    }

    let startPeriodIndex = timetable.periods.findIndex(e=>e.id == card.entry.periodId);
    let startPeriod = timetable.periods[startPeriodIndex];
    let endPeriod = timetable.periods[startPeriodIndex+(card.lesson.duration-1)];

    let periodText = startPeriod.name;

    if (startPeriod != endPeriod){
        periodText += `-${endPeriod.name}`;
    }

    let details: string[][] = [
        [timetable.strings.teacher,getTeacherText(card)],
        [timetable.strings.classroom,getClassroomText(card)],
        [timetable.strings.group,getGroupText(card)],
        [timetable.strings.week,card.week.name],
    ]

    return <InnerContainer card={card}>
        <SubjectText>{card.subject.name}</SubjectText>
        <QuickInfo>
            <PeriodText>{periodText}</PeriodText>
            <View>
                <Text>{`${startPeriod.startTime}-${endPeriod.endTime}`}</Text>
                <Text style={{opacity: 0.75}}>{getShortClassroomText(card)}</Text>
            </View>
        </QuickInfo>
        { details.map(([title,text])=>{
            return <Text key={title}>
                <Text style={{fontWeight: "bold"}}>{title}</Text>
                <Text>{": "+text}</Text>
            </Text>
        }) }
    </InnerContainer>
}

export function LessonModal(){

    let { cardData: card, hide } = useLessonModalStore();

    return <Modal
        animationType="fade"
        visible={card != undefined}
        transparent={true}
        onRequestClose={hide}
    >
        <TouchableWithoutFeedback
            onPress={hide}
        >
            <Overlay>
                { card && <ModalInner card={card} /> }
            </Overlay>
        </TouchableWithoutFeedback>
    </Modal>
}