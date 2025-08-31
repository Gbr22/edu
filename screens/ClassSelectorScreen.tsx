import { ScrollView, View } from 'react-native';
import { globalState, useGlobalStore } from '../state/GlobalStore';
import { ControlPanel } from '../components/classSelector/ClassSelectorControlPanel';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NoTimetablesScreen } from './NoTimetablesScreen';
import { ErrorScreen } from './ErrorScreen';
import { LoadingScreen } from './LoadingScreen';
import { OverlayView } from '../styles/styles';
import { Class } from '../components/classSelector/ClassSelectorEntry';
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
                paddingLeft: insets.left,
                paddingRight: insets.right,
            }}
            contentContainerStyle={{
                paddingBottom: insets.bottom + 20,
            }}
            stickyHeaderIndices={[0]}
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