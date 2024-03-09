import { useNavigation } from "../navigation";
import { PrimaryButton } from "../components/PrimaryButton";
import { ArrowLeft, Meh } from "react-native-feather";
import { CenteredFillView } from '../styles/styles';
import { ErrorText } from "./ErrorScreen";
import { useThemeContext } from "../styles/ThemeContext";

export function NoTimetablesScreen(){

    const navigation = useNavigation();
    const theme = useThemeContext();

    return <CenteredFillView>
        <Meh color={theme.colors.foreground} width={60} height={60} />
        <ErrorText>No timetables available</ErrorText>
        <PrimaryButton
            onPress={()=>{
                navigation.pop();
            }}
            icon={ArrowLeft}
            text='Go back'
        />
    </CenteredFillView>
}