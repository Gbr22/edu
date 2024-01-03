import { TouchableNativeFeedback } from "react-native";
import { Class } from "../../data/classes";
import { useNavigation } from "../../navigation";
import styled from "../../styles/styled-components";
import { Centered } from "../../styles/styles";

const OuterContainer = styled.View`
    margin: 10px;
    background-color: ${props=>props.theme.colors.lighterElement};
    width: 84px;
    border-radius: 10px;
    overflow: hidden;
`
const InnerContainer = styled.View`
    ${Centered}
    width: 100%;
    padding: 3.5px 0;
`
const ButtonText = styled.Text`
    font-size: 16px;
    color: #515151;
`

export function BackButton({classData}: {classData: Class}){
    let navigation = useNavigation();

    return <OuterContainer>
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
}