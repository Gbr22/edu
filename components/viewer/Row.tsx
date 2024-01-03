import { View } from "react-native";
import { CardData, getCardKey, getCardsInRow, PlaceholderCardData } from "../../data/cards";
import { useGlobalStore } from "../../state/GlobalStore";
import styled from "../../styles/styled-components";
import { Card } from "./Card";
import { Sizes } from "./Sizes";

const Container = styled.View`
    flex-direction: row;
    width: 100%;
    margin-bottom: ${Sizes.gap}px;
    height: ${Sizes.rowHeight}px;
`

interface Props {
    dayId: string
    periodId: string
    classId: string
}

export function Row({dayId, periodId, classId}: Props){

    let timetable = useGlobalStore(state=>state.timetable);
    let cards: (CardData | PlaceholderCardData)[] = [];
    if (timetable){
        cards = getCardsInRow(timetable,dayId,periodId,classId);
    }

    return <Container>
        { cards.map(card=>{
            return <Card key={getCardKey(card)} card={card}></Card>
        }) }
    </Container>
}