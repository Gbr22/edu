import { Fragment } from "react";
import { View, Text } from "react-native"
import { useGlobalStore } from "../../state/GlobalStore";
import styled from "styled-components/native";
import { Centered } from "../../styles/styles";
import { Sizes, useRowHeight } from "./Sizes";

const Period = styled.View`
    ${Centered}
    margin-bottom: ${Sizes.gap}px;
`
const PeriodText = styled.Text`
    font-size: 18px;
    color: ${({theme})=>theme.colors.foreground};
    opacity: 0.7;
`

export function Periods() {
    const { timetable } = useGlobalStore();
    const rowHeight = useRowHeight();

    return <View style={{
        width: 30,
    }}>
        { timetable?.periods.map(period=>{
            return <Period
                key={period.id}
                style={{
                    height: rowHeight,
                }}
            >
                <PeriodText>{period.name}</PeriodText>
            </Period>
        }) }
    </View>
}