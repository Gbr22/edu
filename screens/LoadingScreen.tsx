import { View, Text, TouchableNativeFeedback, ActivityIndicator } from "react-native";
import { CenteredFillView } from "../styles/styles";

export function LoadingScreen(){
    return <CenteredFillView>
        <ActivityIndicator color={"#000"} size={"large"}></ActivityIndicator>
    </CenteredFillView>
}