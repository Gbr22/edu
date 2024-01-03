import { Fragment } from "react";
import { View, Text } from "react-native"
import { useGlobalStore } from "../../state/GlobalStore";
import styled from "../../styles/styled-components";
import { Centered } from "../../styles/styles";
import { Sizes } from "./Sizes";

const Period = styled.View`
    ${Centered}
    height: ${Sizes.rowHeight}px;
    margin-bottom: ${Sizes.gap}px;
`
const PeriodText = styled.Text`
    font-size: 18px;
    color: #2F2F2F;
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