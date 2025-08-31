import { View } from "react-native";
import { CardData, getCardKey, getCardsInRow, PlaceholderCardData } from "../../data/cards";
import { useGlobalStore } from "../../state/GlobalStore";
import styled from "styled-components/native";
import { Card } from "./Card";
import { Sizes } from "./Sizes";
import { Substitutions } from "../../data/substitution";

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
    substitutions: Substitutions | null
}

export function Row({dayId, periodId, classId, substitutions}: Props){

    const { timetable } = useGlobalStore();
    let cards: (CardData | PlaceholderCardData)[] = [];
    if (timetable){
        cards = getCardsInRow(timetable,dayId,periodId,classId);
    }

    return <Container>
        { cards.map(card=>{
            return <Card key={getCardKey(card)} card={card} dayId={dayId} classId={classId} periodId={periodId} substitutions={substitutions}></Card>
        }) }
    </Container>
}