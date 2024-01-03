import { RefObject } from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import PagerView from 'react-native-pager-view';
import { create } from 'zustand';
import { useGlobalStore } from '../../state/GlobalStore'
import styled from '../../styles/styled-components';
import { Centered } from '../../styles/styles';

const Container = styled.View`
    ${Centered}
    width: 100%;
    background-color: ${props=>props.theme.colors.background};
    flex-direction: row;
    height: 50px;
    elevation: 8;
`
const DayOuter = styled.View`
    margin: 0 15px;
`
let circleSize = 30;
const DayInner = styled.View<{ isActive: boolean }>`
    ${Centered}
    width: ${circleSize}px;
    height: ${circleSize}px;
    border-radius: ${circleSize}px;
    background-color: ${({isActive})=>isActive ? "#0074D921" : "transparent"};
`
const DayText = styled.Text<{ isActive: boolean }>`
    font-size: 15px;
    font-weight: bold;
    color: ${({isActive})=>isActive ? "#0074D9" : "#3C3C3C"};
`

interface Props {
    pagerRef: RefObject<PagerView>
}

interface DaySelectorState {
    selectedDay: number
}

export const useDaySelectorStore = create<DaySelectorState>(set=>({
    selectedDay: 0,
}))

export function DaySelector({pagerRef}: Props){
    let days = useGlobalStore(state=>state.timetable?.days);
    let selectedDay = useDaySelectorStore(state=>state.selectedDay);

    return <Container>
        { days?.filter(e=>e.index != null).map(day=>{
            let isActive = day.index == selectedDay;
            return <DayOuter key={day.id}>
                <TouchableOpacity
                    onPress={()=>{
                        pagerRef.current?.setPageWithoutAnimation(Number(day.index));
                        useDaySelectorStore.setState({selectedDay: Number(day.index)})
                    }}
                >
                    <DayInner isActive={isActive}>
                        <DayText isActive={isActive}>{day.shortName}</DayText>
                    </DayInner>
                </TouchableOpacity>
            </DayOuter>
        }) }
    </Container>
}