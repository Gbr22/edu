import { TouchableOpacity, View } from 'react-native';
import { FillView } from '../styles/styles';
import styled from 'styled-components/native';
import { Briefcase, Calendar } from 'react-native-feather';
import { useThemeContext } from '../styles/ThemeContext';
import { create } from 'zustand';
import { ClassSelector } from './ClassSelector';
import { Substitutions } from './Substitutions';
import { useEffect } from 'react';
import { globalState, updateTimetable } from '../state/GlobalStore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFontScale } from '../fontScale';

type PageId = "classes" | "substitutions";

const selectedPageStore = create(()=>{
    return {
        selectedPage: "classes" satisfies PageId,
    }
})
const useSelectedPage = selectedPageStore;

const MenuContainer = styled.View`
    background-color: ${props=>props.theme.colors.navBackground};
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    elevation: 1;
`

interface MenuItemProps {
    icon: (o: { width: number, color: string })=>any
    onPress: ()=>void
    pageId?: string
}

function MenuItem(props: MenuItemProps) {
    const theme = useThemeContext();
    const Icon = props.icon;
    const selectedPage = useSelectedPage().selectedPage;
    const isSelected = selectedPage === props.pageId;
    const fontScale = useFontScale();

    return <View>
        <TouchableOpacity
            onPress={props.onPress}
        >
            <Icon
                width={35 * fontScale}
                color={isSelected ? theme.colors.navForegroundActive : theme.colors.foreground}
            />
        </TouchableOpacity>
    </View>
}



function switchPage(pageId: PageId){
    selectedPageStore.setState({
        selectedPage: pageId
    })
}

function Menu(){
    const fontScale = useFontScale();
    const height = 50 * fontScale;
    const insets = useSafeAreaInsets();

    return <MenuContainer
        style={{
            paddingBottom: insets.bottom,
            height: height + insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
        }}
    >
        <MenuItem
            icon={Calendar}
            onPress={switchPage.bind(null,"classes")}
            pageId={"classes"}
        />
        <MenuItem
            icon={Briefcase}
            onPress={switchPage.bind(null,"substitutions")}
            pageId={"substitutions"}
        />
    </MenuContainer>
}

const ContentContainer = styled.View`
    flex: 1;
`

function Content(){
    const pageId = useSelectedPage().selectedPage;

    return <ContentContainer>
        { pageId === "classes" && <ClassSelector /> }
        { pageId === "substitutions" && <Substitutions /> }
    </ContentContainer>
}

export function SchoolHomeScreen(){
    useEffect(() => {
        const schoolId = globalState.get().schoolId;
        if (!schoolId){
            return;
        }
        updateTimetable(schoolId,undefined);
    }, []);

    return <>
        <FillView>
            <Content />
            <Menu />
        </FillView>
    </>;
}