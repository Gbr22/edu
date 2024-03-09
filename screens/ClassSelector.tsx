import { Link, useRoute } from '@react-navigation/native';
import { useEffect } from 'react';
import { Button, ScrollView, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import { SchoolHomeRoute } from '../navigation';
import { globalState, updateTimetable, useGlobalStore } from '../state/GlobalStore';
import { ControlPanel } from '../components/schoolHome/ControlPanel';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NoTimetablesScreen } from './NoTimetablesScreen';
import { ErrorScreen } from './ErrorScreen';
import { LoadingScreen } from './LoadingScreen';
import { OverlayView } from '../styles/styles';
import { Class } from '../components/schoolHome/Class';
import styled from 'styled-components/native';

const ClassesContainer = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
`

export function ClassSelector(){
    let route = useRoute<SchoolHomeRoute>();
    let schoolId = route.params.schoolId;
    let {timetable, versions, error} = useGlobalStore(({versions, timetable, error})=>({versions,timetable,error}));

    

    if (error != undefined){
        return <ErrorScreen
            error={error}
            refreshAction={globalState.refresh}
            backButtonEnabled={true}
        />
    }

    if (versions && !versions.current){
        return <NoTimetablesScreen />
    }

    return <View>
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
    </View>
}