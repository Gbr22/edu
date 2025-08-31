import { Link, useRoute } from '@react-navigation/native';
import { useEffect } from 'react';
import { Button, ScrollView, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import { SchoolHomeRoute } from '../navigation';
import { globalState, updateTimetable, useGlobalStore } from '../state/GlobalStore';
import { ControlPanel } from '../components/schoolHome/ControlPanel';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
`;

export function ClassSelector(){
    const { timetable, versions, error } = useGlobalStore();
    const insets = useSafeAreaInsets();

    if (error != undefined){
        return <ErrorScreen
            error={error}
            refreshAction={globalState.refresh}
            backButtonEnabled={true}
        />;
    }

    if (versions && !versions.current){
        return <NoTimetablesScreen />
    }

    return <View
        style={{
            flex: 1,
        }}
    >
        <OverlayView>
            { (!versions || !timetable) && <LoadingScreen /> }
        </OverlayView>
        <ScrollView
            style={{
                paddingTop: insets.top,
                paddingLeft: insets.left,
                paddingRight: insets.right,
            }}
            contentContainerStyle={{
                paddingBottom: insets.bottom + 20,
            }}
        >
            <ControlPanel />
            <ClassesContainer>
                { timetable?.classes.map(data=>{
                    return <Class data={data} key={data.id} />;
                }) }
            </ClassesContainer>
        </ScrollView>
    </View>
}