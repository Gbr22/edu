import { useEffect, useState } from 'react';
import { IdInput, idInputStore } from '../components/home/IdInput';
import { CenteredFillView } from '../styles/styles';
import styled from 'styled-components/native';
import { getLastSchoolId } from '../storage/preferences';
import { openSchool, useNavigation } from '../navigation';
import { View } from 'react-native';

let Illustration = styled.Image`
    width: 100%;
    height: 30%;
    margin-bottom: 50px;
`

let isFirstLoad: boolean = true;

export function HomeScreen(){
    const navigation = useNavigation();
    const [isChecking, setIsChecking] = useState(isFirstLoad);

    useEffect(()=>{
        if (isFirstLoad){
            isFirstLoad = false;
            getLastSchoolId().then(schoolId=>{
                if (schoolId){
                    openSchool(navigation,schoolId);
                    idInputStore.getState().setSchoolId(schoolId);
                }
                setTimeout(()=>{
                    setIsChecking(false);
                },100)
            }).catch(()=>{
                setIsChecking(false);
            })
        }
    });

    if (isChecking){
        return <CenteredFillView></CenteredFillView>;
    }

    return <CenteredFillView>
        <Illustration
            source={require("../assets/homepage.png")}
            resizeMode={"contain"}
        />
        <IdInput />
    </CenteredFillView>
}