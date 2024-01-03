import { View, Image } from 'react-native';
import { IdInput } from '../components/home/IdInput';
import { CenteredFillView } from '../styles/styles';
import styled from 'styled-components/native';

let Illustration = styled.Image`
    width: 100%;
    height: 30%;
    margin-bottom: 50px;
`

export function HomeScreen(){
    return <CenteredFillView>
        <Illustration
            source={require("../assets/homepage.png")}
            resizeMode={"contain"}
        />
        <IdInput />
    </CenteredFillView>
}