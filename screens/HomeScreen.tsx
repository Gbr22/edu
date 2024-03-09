import { useEffect, useState } from 'react';
import { IdInput, idInputStore } from '../components/home/IdInput';
import { CenteredFillView } from '../styles/styles';
import styled from 'styled-components/native';
import { getLastSchoolId } from '../storage/preferences';
import { openSchool, useNavigation } from '../navigation';
import { useThemeContext } from '../styles/ThemeContext';

let Illustration = styled.Image`
    width: 100%;
    height: 30%;
    margin-bottom: 50px;
`

let isFirstLoad: boolean = true;

export function HomeScreen(){
    const navigation = useNavigation();
    const [isChecking, setIsChecking] = useState(isFirstLoad);
    const theme = useThemeContext();

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

    const imageSources = {
        inverted: require("../assets/homepage-inverted.png"),
        normal: require("../assets/homepage.png"),
    }

    return <CenteredFillView>
        <Illustration
            source={theme.isDark ? imageSources.inverted : imageSources.normal}
            resizeMode={"contain"}
        />
        <IdInput />
    </CenteredFillView>
}