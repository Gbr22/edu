import { Modal, View, Text, TouchableWithoutFeedback } from "react-native";
import { create } from "zustand";
import { CardData, getClassroomText, getGroupText, getShortClassroomText, getTeacherText } from "../../data/cards";
import { useGlobalStore } from "../../state/GlobalStore";
import styled from "styled-components/native";
import { Centered, getCardColor } from "../../styles/styles";
import { getPeriodInfo } from "../../data/periods";
import { SubstitutionPeriodInfo } from "../../data/substitution";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SimpleText = styled.Text`
    color: ${({theme})=>theme.colors.foreground};
`

const Overlay = styled.View`
    ${Centered}
    flex: 1;
    background-color: ${({theme})=>theme.colors.modalBackdrop};
`
const InnerContainer = styled.View<{ card: CardData }>`
    border-radius: 18px;
    width: 100%;
    max-width: 266px;
    padding: 18px;
    elevation: 1;
    background-color: ${({card,theme})=>getCardColor(card,theme)};
`
const SubjectText = styled(SimpleText)`
    font-size: 19px;
    text-align: center;
    color: ${({theme})=>theme.colors.foreground};
`
const QuickInfo = styled.View`
    ${Centered}
    flex-direction: row;
    margin: 12px 0;
    color: ${({theme})=>theme.colors.foreground};
`
const PeriodText = styled(SimpleText)`
    font-weight: bold;
    font-size: 21px;
    margin-right: 11px;
    color: ${({theme})=>theme.colors.foreground};
`

const PeriodInfo = styled.View``

const Divider = styled.View`
    width: 100%;
    height: 1px;
    background-color: ${({theme})=>theme.colors.foreground};
    margin: 8px 0;
    opacity: 0.4;
`

interface ModalData {
    cardData: CardData
    periodInfo: SubstitutionPeriodInfo | undefined
}

interface LessonModalState {
    data?: ModalData
    show: (data: ModalData) => void
    hide: ()=>void
}

export const useLessonModalStore = create<LessonModalState>(set=>({
    cardData: undefined,
    show(data: ModalData){
        set({data});
    },
    hide(){
        set({data: undefined});
    }
}))

function ModalInner(props: {data: ModalData}){
    let { data } = props;
    const card = data.cardData;
    const periodInfo = data.periodInfo?.info;
    const { timetable } = useGlobalStore();

    if (!timetable){
        return <></>
    }

    const { periodText, startPeriod, endPeriod } = getPeriodInfo({
        periods: timetable.periods,
        periodId: card.entry.periodId,
        duration: card.lesson.duration
    })

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
                <SimpleText>{`${startPeriod.startTime}-${endPeriod.endTime}`}</SimpleText>
                <SimpleText style={{opacity: 0.75}}>{getShortClassroomText(card)}</SimpleText>
            </View>
        </QuickInfo>
        { details.map(([title,text])=>{
            return <SimpleText key={title}>
                <SimpleText style={{fontWeight: "bold"}}>{title}</SimpleText>
                <SimpleText>{": "+text}</SimpleText>
            </SimpleText>
        }) }
        { periodInfo && <PeriodInfo>
            <Divider />
            <SimpleText>
                {periodInfo}
            </SimpleText>
        </PeriodInfo> }
    </InnerContainer>
}

export function LessonModal(){
    const insets = useSafeAreaInsets();
    const { data, hide } = useLessonModalStore();

    return <Modal
        animationType="fade"
        visible={data != undefined}
        transparent={true}
        onRequestClose={hide}
    >
        <TouchableWithoutFeedback
            onPress={hide}
        >
            <Overlay
                style={{
                    paddingTop: insets.top,
                    paddingBottom: insets.bottom,
                    paddingLeft: insets.left,
                    paddingRight: insets.right,
                }}
            >
                { data && <ModalInner data={data} /> }
            </Overlay>
        </TouchableWithoutFeedback>
    </Modal>
}