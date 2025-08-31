import { useRoute } from '@react-navigation/native';
import { ScrollView, View } from 'react-native';
import { TimetableViewerRoute } from '../navigation';
import { createRef, useEffect } from 'react';
import { globalState, updateTimetable } from '../state/GlobalStore';
import { DaySelector, useDaySelectorStore } from '../components/viewer/DaySelector';
import { Day } from '../components/viewer/Day';
import PagerView from 'react-native-pager-view';
import { CenteredView, FillView } from '../styles/styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LessonModal } from '../components/viewer/LessonModal';
import { ErrorScreen } from './ErrorScreen';
import { LoadingScreen } from './LoadingScreen';
import styled from 'styled-components/native';
import { BackButton } from '../components/viewer/TimetableViewerControlPanel';
import { Periods } from '../components/viewer/Periods';

const TimetableOuter = styled(View)`
    flex-grow: 1;
    flex-direction: row;
`
const TimetableInner = styled(View)`
    flex-grow: 1;
`
const Pager = styled(PagerView)`
    flex-grow: 1;
`

export function TimetableViewerScreen(){
    const route = useRoute<TimetableViewerRoute>();
    const { schoolId, timetableId } = route.params;
    const { timetable, error } = globalState.use();
    const insets = useSafeAreaInsets();

    useEffect(() => {
        updateTimetable(schoolId,timetableId);
    }, []);

    if (error != undefined){
        return <ErrorScreen
            error={error}
            refreshAction={globalState.refresh}
            backButtonEnabled={true}
        />
    }

    const classData = timetable?.classes.find(e=>e.id == route.params.objectId);

    if (!timetable || !classData){
        return <LoadingScreen />
    }

    const pagerRef = createRef<PagerView>();

    // note: we don't use it as a hook, so the component doesn't rerender when the value changes.
    const selectedDay = useDaySelectorStore.getState().selectedDay;

    return <FillView>
        <LessonModal />
        <ScrollView
            contentContainerStyle={{
                paddingLeft: insets.left,
                paddingRight: insets.right,
                paddingBottom: insets.bottom,
            }}
            stickyHeaderIndices={[0]}
        >
            <BackButton classData={classData} />
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
        </ScrollView>
        <DaySelector pagerRef={pagerRef}></DaySelector>
    </FillView>
}