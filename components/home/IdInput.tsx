import { TouchableNativeFeedback, ActivityIndicator } from "react-native";
import { create } from "zustand";
import { X, ArrowRight } from "react-native-feather";
import { openSchool, useNavigation } from "../../navigation";
import { doesSchoolExist } from "../../data/api";
import { useGlobalStore } from "../../state/GlobalStore";
import { fetch as getNetInfo } from "@react-native-community/netinfo";
import { doesSchoolExistInCache } from "../../storage/cache";
import styled, { css } from "styled-components/native";
import { Centered } from "../../styles/styles";
import { useEffect } from "react";
import { getLastSchoolId, setLastSchoolId } from "../../storage/preferences";

interface State {
    schoolId: string
    isValidSchoolId: boolean | undefined
    setSchoolId: (id: string)=>void
}
let validationTimeout: ReturnType<typeof setTimeout>;

export const idInputStore = create<State>(set=>({
    schoolId: "",
    isValidSchoolId: undefined,
    isFirstLoad: true,
    navigateSchoolId: undefined,
    setSchoolId(schoolId){
        set({
            ...this,
            schoolId,
            isValidSchoolId: undefined
        })
        clearTimeout(validationTimeout);
        if (schoolId != ""){
            validationTimeout = setTimeout(async ()=>{
                const networkState = await getNetInfo();
                const isInternetReachable = networkState.isConnected;
                let checkSchool = isInternetReachable ? doesSchoolExist : doesSchoolExistInCache;
                checkSchool(schoolId).then(isValidSchoolId=>{
                    set({
                        isValidSchoolId
                    })
                })
            },300)
        }
    },
}))

const inputHeight = 45;
const borderRadius = 12;

const Container = styled.View`
    ${Centered}
    flex-direction: row;
    max-width: 100%;
    padding: 0 7px;
`;
const UrlContainer = styled.View`
    ${Centered}
    flex-direction: row;
    background-color: ${props=>props.theme.colors.lightElement};
    height: ${inputHeight}px;
    border-radius: ${borderRadius}px;
    padding: 0 14px;
    flex-shrink: 1;
`;
const TextStyle = css`
    font-size: 16px;
    color: ${({theme})=>theme.colors.foreground};
`;
const UrlText = styled.Text`
    ${TextStyle}
`
const Input = styled.TextInput<{ isValidSchoolId: boolean | undefined }>`
    ${TextStyle}
    text-align: center;
    padding: 0;
    height: 100%;
    margin: 0;
    flex-shrink: 1;
    font-weight: bold;
    color: ${({ isValidSchoolId, theme })=>isValidSchoolId == false ? theme.colors.error : theme.colors.primary};
`
const ButtonOuter = styled.View`
    border-radius: ${borderRadius}px;
    overflow: hidden;
    margin-left: 7px;
`
const ButtonInner = styled.View<{ isValidSchoolId: boolean | undefined }>`
    ${Centered}
    height: ${inputHeight}px;
    width: ${inputHeight}px;
    background-color: black;
    background-color: ${({isValidSchoolId, theme})=>{
        if (isValidSchoolId == true){
            return theme.colors.primary;
        } else if (isValidSchoolId == false){
            return theme.colors.error;
        } else if (isValidSchoolId == undefined){
            return "#4d4d4d";
        }
    }};
`

export function IdInput(){
    const { schoolId, isValidSchoolId, setSchoolId } = idInputStore();

    let navigation = useNavigation();

    let isLoading = isValidSchoolId == undefined;

    if (schoolId == ""){
        isLoading = false;
    }

    let Icon = isValidSchoolId == false ? X : ArrowRight;

    return <Container>
        <UrlContainer>
            <UrlText>http://</UrlText>
            <Input
                isValidSchoolId={isValidSchoolId}
                onChangeText={(text)=>{
                    let schoolId = text.toLocaleLowerCase();
                    setSchoolId(schoolId);
                }}
                placeholder={"id"}
                placeholderTextColor={"#6c9393"}
                value={schoolId}
            ></Input>
            <UrlText>.edupage.org</UrlText>
        </UrlContainer>
        <ButtonOuter>
            <TouchableNativeFeedback
                onPress={()=>{
                    if (isValidSchoolId){
                        openSchool(navigation,schoolId);
                    }
                }}
            >
                <ButtonInner isValidSchoolId={isValidSchoolId}>
                    { isLoading && <ActivityIndicator size={"small"} color={"#fff"} /> }
                    { !isLoading && <Icon width={25} color={"#fff"}></Icon> }
                </ButtonInner>
            </TouchableNativeFeedback>
        </ButtonOuter>
    </Container>
}