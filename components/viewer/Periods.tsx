import { Fragment } from "react";
import { View, Text } from "react-native"
import { useGlobalStore } from "../../state/GlobalStore";
import styled from "styled-components/native";
import { Centered } from "../../styles/styles";
import { Sizes } from "./Sizes";

const Period = styled.View`
    ${Centered}
    height: ${Sizes.rowHeight}px;
    margin-bottom: ${Sizes.gap}px;
`
const PeriodText = styled.Text`
    font-size: 18px;
    color: ${({theme})=>theme.colors.foreground};
    opacity: 0.7;
`

export function Periods() {
    let timetable = useGlobalStore(state=>state.timetable);

    return <View style={{
        width: 30,
    }}>
        { timetable?.periods.map(period=>{
            return <Period key={period.id}>
                <PeriodText>{period.name}</PeriodText>
            </Period>
        }) }
    </View>
}