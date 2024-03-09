import { useEffect } from "react";
import { globalState } from "../state/GlobalStore";
import { SubstitutionEntry } from "../components/substitutions/SubstitutionEntry";
import styled from "styled-components/native";
import { LoadingScreen } from "./LoadingScreen";
import { ErrorScreen } from "./ErrorScreen";
import { substitutionsState } from "../state/substitutionsState";
import { SubstitutionControls } from "../components/substitutions/SubstitutionControls";

const Data = styled.View`
    gap: 20px;
    padding: 20px;
`

const ContentWrapper = styled.View`
    flex: 1;
    height: 100%;
`

const RootStyles = styled.ScrollView`
    flex-direction: column;
    height: 100%;
`

function SubstitutionsContainer(props: { children: any }){
    return <RootStyles
        contentContainerStyle={{
            minHeight: "100%"
        }}
    >
        {props.children}
    </RootStyles>
}

export function Substitutions(){
    const { schoolId } = globalState.use();
    
    const state = substitutionsState.use();

    useEffect(()=>{
        if (!schoolId){
            return;
        }
        substitutionsState.refresh();
    },[state.date])


    if (!schoolId){
        return;
    }

    if (state.currentSubstitutions === undefined){
        return <SubstitutionsContainer>
            <SubstitutionControls />
            <ContentWrapper>
                <LoadingScreen />
            </ContentWrapper>
        </SubstitutionsContainer>
    }

    if (state.currentSubstitutions instanceof Error){
        return <SubstitutionsContainer>
            <SubstitutionControls />
            <ErrorScreen
                error={state.currentSubstitutions}
                refreshAction={substitutionsState.refresh}
            />
        </SubstitutionsContainer>
    }

    return <SubstitutionsContainer>
        <SubstitutionControls />
        <Data>
        { state.currentSubstitutions?.entries.map(entry=>{
            return <SubstitutionEntry data={entry} key={entry.className} />
        }) }
        </Data>
    </SubstitutionsContainer>
}