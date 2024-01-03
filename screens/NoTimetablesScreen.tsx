import { View, Text, TouchableNativeFeedback } from "react-native";
import { useNavigation } from "../navigation";
import { PrimaryButton } from "../components/PrimaryButton";
import FeatherIcons from '@expo/vector-icons/Feather';
import { CenteredFillView } from '../styles/styles';
import { ErrorText } from "./ErrorScreen";

export function NoTimetablesScreen(){

    let navigation = useNavigation();

    return <CenteredFillView>
        <FeatherIcons name='meh' color={"#000"} size={60} />
        <ErrorText>No timetables available</ErrorText>
        <PrimaryButton
            onPress={()=>{
                navigation.pop();
            }}
            icon='arrow-left'
            text='Go back'
        />
    </CenteredFillView>
}