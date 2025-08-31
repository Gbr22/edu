import { Text, TouchableNativeFeedback, View } from "react-native";
import { Class } from "../../data/classes";
import { useNavigation } from "../../navigation";
import styled from "styled-components/native";
import { Centered, CenteredView } from "../../styles/styles";
import { useThemeContext } from "../../styles/ThemeContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const OuterContainer = styled(View)`
    margin: 10px;
    background-color: ${props=>props.theme.colors.lighterElement};
    width: 84px;
    border-radius: 10px;
    overflow: hidden;
`
const InnerContainer = styled(View)`
    ${Centered}
    width: 100%;
    padding: 3.5px 0;
`
const ButtonText = styled(Text)`
    font-size: 16px;
    color: ${({theme})=>theme.colors.foreground};
    opacity: 0.9;
`

export function BackButton({classData}: {classData: Class}){
    const navigation = useNavigation();
    const theme = useThemeContext();
    const insets = useSafeAreaInsets();

    return <CenteredView
        style={{
            paddingTop: insets.top,
            backgroundColor: theme.colors.glassBackground,
        }}
    >
        <OuterContainer>
            <TouchableNativeFeedback
                onPress={()=>{
                    navigation.pop();
                }}
            >
                <InnerContainer>
                    <ButtonText>{classData.name}</ButtonText>
                </InnerContainer>
            </TouchableNativeFeedback>
        </OuterContainer>
    </CenteredView>
}