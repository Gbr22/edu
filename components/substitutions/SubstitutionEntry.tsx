import { SubstitutionEntry as SubstitutionEntryData, SubstitutionPeriodInfo as SubstitutionPeriodInfoData } from "../../data/substitution";
import styled from "styled-components/native";
import { useThemeContext } from "../../styles/ThemeContext";
import seedrandom from "seedrandom";

const Container = styled.View`
    padding: 8.66px;
    padding-left: 0;
    padding-right: 0;
    border: 1px solid  ${({theme})=>theme.colors.borderColor};
    border-radius: 13.66px;
`

const HeaderContainer = styled.View`
    padding: 12px;
    padding-top: 0;
    padding-bottom: 3px;
`

const Header = styled.View`
    align-self: flex-start;
    position: relative;
    overflow: hidden;
`

const HeaderText = styled.Text`
    color: ${({theme})=>theme.colors.foreground};
    font-size: 18.38px;
    font-weight: bold;
    align-self: flex-start;
`

const HeaderUnderline = styled.View<{ color: string }>`
    width: 100%;
    height: 6px;
    position: absolute;
    bottom: 2px;
    background-color: ${({color})=>color};
    z-index: -1;
`

const Items = styled.View`
    flex-direction: column;
    gap: 3.33px;
`

export function SubstitutionEntry(props: { data: SubstitutionEntryData }){
    const theme = useThemeContext();
    const className = String(props.data.className);
    const random = seedrandom(className);
    const underlineColor = theme.isDark ?
        `hsl(${Math.floor(random()*360)}, 50%, 30%)` :
        `hsl(${Math.floor(random()*360)}, 100%, 88%)`

    return <Container>
        { props.data.className && <HeaderContainer>
            <Header>
                <HeaderText>{props.data.className}</HeaderText>
                <HeaderUnderline color={underlineColor} />
            </Header>
        </HeaderContainer> }
        <Items>
            { props.data.items.map(periodInfo=>{
                return <SubstitutionPeriodInfo data={periodInfo} key={`${periodInfo.period}/${periodInfo.info}`} />
            }) }
        </Items>
    </Container>
}

const PeriodInfoContainer = styled.View`
    flex-direction: row;
`

const PeriodText = styled.Text`
    color: ${({theme})=>theme.colors.foreground};
    width: 48px;
    font-size: 16px;
    text-align: center;
    padding-left: 1px;
`

const InfoText = styled.Text<{ isCentered: boolean }>`
    color: ${({theme})=>theme.colors.foreground};
    flex: 1;
    text-align: ${({isCentered})=>isCentered ? "center" : "left"};
    padding-right: 8.66px;
`

function SubstitutionPeriodInfo(props: { data: SubstitutionPeriodInfoData }){
    return <PeriodInfoContainer>
        { props.data.period && <PeriodText>
            {props.data.period}
        </PeriodText> }
        { props.data.info && <InfoText isCentered={!props.data.period}>
            {props.data.info}
        </InfoText> }
    </PeriodInfoContainer>
}