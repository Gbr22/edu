import { useEffect, useState } from 'react';
import { IdInput, idInputStore } from '../components/home/IdInput';
import { CenteredFillView } from '../styles/styles';
import styled from 'styled-components/native';
import { getLastSchoolId } from '../storage/preferences';
import { openSchool, useNavigation } from '../navigation';
import { useThemeContext } from '../styles/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView, View } from 'react-native';
import { AvoidSoftInputView } from 'react-native-avoid-softinput';

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
    const insets = useSafeAreaInsets();

    useEffect(()=>{
        if (isFirstLoad){
            isFirstLoad = false;
            getLastSchoolId().then(schoolId=>{
                if (schoolId){
                    //openSchool(navigation,schoolId);
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

    return <View
        style={{
            flex: 1,
        }}
    >
        <ScrollView
            style={{
                flex: 1,
            }}
            contentContainerStyle={{
                paddingLeft: insets.left,
                paddingRight: insets.right,
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                flex: 1,
            }}
        >
            <AvoidSoftInputView
                style={{
                    flex: 1,
                    width: '100%',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
                showAnimationDelay={0}
                showAnimationDuration={80}
                hideAnimationDuration={80}
                hideAnimationDelay={0}
                avoidOffset={48}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        alignItems: 'stretch',
                        justifyContent: 'center',
                    }}
                >
                    <Illustration
                        source={theme.isDark ? imageSources.inverted : imageSources.normal}
                        resizeMode={"contain"}
                    />
                    <IdInput />
                </View>
            </AvoidSoftInputView>
        </ScrollView>
    </View>
}