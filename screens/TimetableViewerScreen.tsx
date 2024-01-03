import { useRoute } from '@react-navigation/native';
import { ScrollView, Text, TouchableNativeFeedback, View } from 'react-native';
import { TimetableViewerRoute, useNavigation } from '../navigation';
import { createRef, useEffect } from 'react';
import { useGlobalStore } from '../state/GlobalStore';
import { DaySelector, useDaySelectorStore } from '../components/viewer/DaySelector';
import { Day } from '../components/viewer/Day';
import PagerView from 'react-native-pager-view';
import { Centered, CenteredView, FillView } from '../styles/styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LessonModal } from '../components/viewer/LessonModal';
import { ErrorScreen } from './ErrorScreen';
import { LoadingScreen } from './LoadingScreen';
import { Class } from '../data/classes';
import styled, { css } from '../styles/styled-components';
import { BackButton } from '../components/viewer/BackButton';
import { Periods } from '../components/viewer/Periods';

const TimetableOuter = styled.View`
    flex-grow: 1;
    flex-direction: row;
`
const TimetableInner = styled.View`
    flex-grow: 1;
`
const Pager = styled(PagerView)`
    flex-grow: 1;
`

export function TimetableViewerScreen(){
    let route = useRoute<TimetableViewerRoute>();
    let { schoolId, timetableId } = route.params;

    let {timetable, updateTimetable, error} = useGlobalStore(({timetable, updateTimetable, error})=>({timetable, updateTimetable, error}));

    useEffect(() => {
        updateTimetable(schoolId,timetableId);
    }, []);

    if (error != undefined){
        return <ErrorScreen />
    }

    let classData = timetable?.classes.find(e=>e.id == route.params.objectId);

    if (!timetable || !classData){
        return <LoadingScreen />
    }

    let pagerRef = createRef<PagerView>();

    // note: we don't use it as a hook, so the component doesn't rerender when the value changes.
    let selectedDay = useDaySelectorStore.getState().selectedDay;

    return <FillView>
        <LessonModal />
        <ScrollView>
            <SafeAreaView>
                <CenteredView>
                    <BackButton classData={classData} />
                </CenteredView>
                <TimetableOuter>
                    <Periods />
                    <TimetableInner>
                        <Pager
                            ref={pagerRef}
                            onPageSelected={(event)=>{
                                let pos = event.nativeEvent.position;
                                useDaySelectorStore.setState({selectedDay:pos});
                            }}
                            initialPage={selectedDay}
                        >
                            { timetable?.days.filter(e=>e.index != null).map(day=>{
                                return <Day key={day.id} dayId={day.id} classId={route.params.objectId}></Day>
                            }) }
                        </Pager>
                    </TimetableInner>
                </TimetableOuter>
            </SafeAreaView>
        </ScrollView>
        <DaySelector pagerRef={pagerRef}></DaySelector>
    </FillView>
}