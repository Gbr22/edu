import { Link, useRoute } from '@react-navigation/native';
import { useEffect } from 'react';
import { Button, ScrollView, Text, TouchableNativeFeedback, View } from 'react-native';
import { SchoolHomeRoute, useNavigation } from '../navigation';
import seedrandom from 'seedrandom';
import { useGlobalStore } from '../state/GlobalStore';
import { ControlPanel } from '../components/schoolHome/ControlPanel';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NoTimetablesScreen } from './NoTimetablesScreen';
import { ErrorScreen } from './ErrorScreen';
import { LoadingScreen } from './LoadingScreen';
import { FillView, OverlayView } from '../styles/styles';
import { Class } from '../components/schoolHome/Class';
import styled from 'styled-components/native';

const ClassesContainer = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
`

export function SchoolHomeScreen(){
    let route = useRoute<SchoolHomeRoute>();
    let schoolId = route.params.schoolId;
    let {timetable, versions, updateTimetable, error} = useGlobalStore(({versions, timetable, updateTimetable, error})=>({versions,timetable,updateTimetable,error}));

    useEffect(() => {
        updateTimetable(schoolId,undefined);
    }, []);

    if (error != undefined){
        return <ErrorScreen />
    }

    if (versions && !versions.current){
        return <NoTimetablesScreen />
    }

    return <FillView>
        <OverlayView>
            { (!versions || !timetable) && <LoadingScreen /> }
        </OverlayView>
         <ScrollView>
            <SafeAreaView>
                <ControlPanel />
                <ClassesContainer>
                    { timetable?.classes.map(data=>{
                        return <Class data={data} key={data.id} />
                    }) }
                </ClassesContainer>
            </SafeAreaView>
        </ScrollView>
    </FillView>
}