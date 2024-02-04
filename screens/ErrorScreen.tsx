import { View, Text, TouchableNativeFeedback } from "react-native";
import { useNavigation } from "../navigation";
import { PrimaryButton } from "../components/PrimaryButton";
import { AlertTriangle, ArrowLeft, RefreshCw } from "react-native-feather";
import { SecondaryButton } from "../components/SecondaryButton";
import { ErrorType, useGlobalStore } from "../state/GlobalStore";
import { CenteredFillView } from "../styles/styles";
import styled from "styled-components/native";
import { useThemeContext } from "../styles/ThemeContext";

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
    const theme = useThemeContext();
    let errorMessage = "An error occurred";
    if (error == ErrorType.offline){
        errorMessage = "There is no internet";
    }

    return <CenteredFillView>
        <AlertTriangle color={theme.colors.foreground} width={60} height={60} />
        <ErrorText>{errorMessage}</ErrorText>
        <PrimaryButton
            onPress={()=>{
                let {schoolId, timetableId, updateTimetable} = useGlobalStore.getState();
                if (!schoolId){
                    return;
                }
                updateTimetable(schoolId, timetableId);
            }}
            icon={RefreshCw}
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
                icon={ArrowLeft}
                text='Go back'
            />
        </View> }
    </CenteredFillView>
}