import { View, Text, TouchableNativeFeedback } from "react-native";
import { useNavigation } from "../navigation";
import { PrimaryButton } from "../components/PrimaryButton";
import { AlertTriangle, ArrowLeft, RefreshCw } from "react-native-feather";
import { SecondaryButton } from "../components/SecondaryButton";
import { ErrorType, useGlobalStore } from "../state/GlobalStore";
import { CenteredFillView } from "../styles/styles";
import styled from "styled-components/native";
import { useThemeContext } from "../styles/ThemeContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const ErrorText = styled.Text`
    font-weight: bold;
    font-size: 23px;
    margin: 25px 0;
    width: 120px;
    text-align: center;
    color: ${props=>props.theme.colors.foreground};
`

interface ErrorScreenProps {
    error: unknown
    refreshAction: ()=>void
    backButtonEnabled?: boolean
}

export function ErrorScreen(props: ErrorScreenProps){
    const navigation = useNavigation();
    const canGoBack = props.backButtonEnabled && navigation.canGoBack();
    const error = props.error;
    const theme = useThemeContext();
    const insets = useSafeAreaInsets();
    let errorMessage = "An error occurred";
    if (error == ErrorType.offline){
        errorMessage = "There is no internet";
    }

    return <CenteredFillView
        style={{
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
        }}
    >
        <AlertTriangle color={theme.colors.foreground} width={60} height={60} />
        <ErrorText>{errorMessage}</ErrorText>
        <PrimaryButton
            onPress={props.refreshAction}
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