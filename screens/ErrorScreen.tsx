import { View, Text, TouchableNativeFeedback } from "react-native";
import { useNavigation } from "../navigation";
import { PrimaryButton } from "../components/PrimaryButton";
import FeatherIcons from '@expo/vector-icons/Feather';
import { SecondaryButton } from "../components/SecondaryButton";
import { ErrorType, useGlobalStore } from "../state/GlobalStore";
import { CenteredFillView } from "../styles/styles";
import styled from "styled-components/native";

export const ErrorText = styled.Text`
    font-weight: bold;
    font-size: 23px;
    margin: 25px 0;
    width: 120px;
    text-align: center;
`

export function ErrorScreen(){

    let navigation = useNavigation();
    let canGoBack = navigation.canGoBack();
    let error = useGlobalStore(state=>state.error);
    let errorMessage = "An error occurred";
    if (error == ErrorType.offline){
        errorMessage = "There is no internet";
    }

    return <CenteredFillView>
        <FeatherIcons name='alert-triangle' color={"#000"} size={60} />
        <ErrorText>{errorMessage}</ErrorText>
        <PrimaryButton
            onPress={()=>{
                let {schoolId, timetableId, updateTimetable} = useGlobalStore.getState();
                if (!schoolId){
                    return;
                }
                updateTimetable(schoolId, timetableId);
            }}
            icon='refresh-cw'
            text='Refresh'
        />
        { canGoBack && <View
            style={{
                marginTop: 7,
            }}
        >
            <SecondaryButton
                onPress={()=>{
                    navigation.pop();
                }}
                icon='arrow-left'
                text='Go back'
            />
        </View> }
    </CenteredFillView>
}