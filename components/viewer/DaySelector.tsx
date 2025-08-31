import { RefObject } from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import PagerView from 'react-native-pager-view';
import { create } from 'zustand';
import { useGlobalStore } from '../../state/GlobalStore'
import styled from 'styled-components/native';
import { Centered } from '../../styles/styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFontScale } from '../../fontScale';

const Container = styled.View`
    ${Centered}
    width: 100%;
    background-color: ${props=>props.theme.colors.navBackground};
    flex-direction: row;
    elevation: 1;
`
const DayOuter = styled.View`
    margin: 0 15px;
`
const DayInner = styled.View<{ isActive: boolean }>`
    ${Centered}
    background-color: ${({ isActive })=>isActive ? "#0074D921" : "transparent"};
`
const DayText = styled.Text<{ isActive: boolean }>`
    font-size: 15px;
    font-weight: bold;
    color: ${({ isActive, theme })=>isActive ? theme.colors.navForegroundActive : theme.colors.foreground};
    opacity: ${({ isActive, theme })=>isActive ? 1: (theme.isDark ? 0.8 : 0.9)};
`

interface Props {
    pagerRef: RefObject<PagerView | null>
}

interface DaySelectorState {
    selectedDay: number
}

export const useDaySelectorStore = create<DaySelectorState>(set=>({
    selectedDay: 0,
}))

export function DaySelector({ pagerRef }: Props){
    const { timetable } = useGlobalStore();
    const days = timetable?.days;
    const selectedDay = useDaySelectorStore(state=>state.selectedDay);
    const insets = useSafeAreaInsets();
    const fontScale = useFontScale();
    const height = 50 * fontScale;
    const circleSize = 30;

    return <Container
        style={{
            height: height + insets.bottom,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
        }}
    >
        { days?.filter(e=>e.index != null).map(day=>{
            const isActive = day.index == selectedDay;
            return <DayOuter key={day.id}>
                <TouchableOpacity
                    onPress={()=>{
                        pagerRef.current?.setPageWithoutAnimation(Number(day.index));
                        useDaySelectorStore.setState({selectedDay: Number(day.index)})
                    }}
                    style={{
                        borderRadius: circleSize,
                        overflow: 'hidden',
                    }}
                >
                    <DayInner
                        isActive={isActive}
                        style={{
                            height: circleSize * fontScale,
                            width: circleSize * fontScale,
                        }}
                    >
                        <DayText isActive={isActive}>{day.shortName}</DayText>
                    </DayInner>
                </TouchableOpacity>
            </DayOuter>
        }) }
    </Container>
}