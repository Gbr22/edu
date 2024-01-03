import { Link, useRoute } from "@react-navigation/native";
import { TouchableNativeFeedback, View, Text } from "react-native";
import seedrandom from "seedrandom";
import styled from "styled-components/native";
import { Class as ClassData } from "../../data/classes";
import { SchoolHomeRoute, useNavigation } from "../../navigation";
import { useGlobalStore } from "../../state/GlobalStore";
import { Centered } from "../../styles/styles";

const circleSize = 49;

const ColoredCircle = styled.View<{ color: string }>`
    position: absolute;
    border-radius: ${circleSize}px;
    width: ${circleSize}px;
    height: ${circleSize}px;
    background-color: ${props=>props.color};
`

const borderWidth = 2;
const size = 87;
const gap = 20;

const OuterContainer = styled.View`
    border-width: ${borderWidth}px;
    border-color: #ECECEC;
    border-radius: 13.5px;
    overflow: hidden;
    margin: 0 ${gap/2}px;
    margin-bottom: ${gap}px;
    width: ${size+borderWidth}px;
    height: ${size+borderWidth}px;
`

const InnerContainer = styled.View`
    ${Centered}
    width: ${size}px;
    height: ${size}px;
`

const ClassText = styled.Text`
    font-size: 18px;
    color: #000000A6;
    font-weight: bold;
    z-index: 1;
    text-align: center;
`

interface Props {
    data: ClassData
}

export function Class({data}: Props){
    let route = useRoute<SchoolHomeRoute>();
    let navigation = useNavigation();
    let schoolId = route.params.schoolId;
    let {versions} = useGlobalStore(({versions})=>({versions}));
    return <OuterContainer>
        <Link to={`/${schoolId}/timetable/${versions?.current?.id}/class/${data.id}`}>
            <TouchableNativeFeedback
                onPress={()=>{
                    navigation.navigate("TimetableViewer", {
                        schoolId,
                        type: "class",
                        timetableId: String(versions?.current?.id),
                        objectId: String(data.id)
                    });
                }}
            >
                <InnerContainer>
                    <ColoredCircle
                        color={`hsl(${Math.floor(seedrandom(data.id)()*360)}, 100%, 88%)`}
                    >
                    </ColoredCircle>
                    <ClassText>{data.shortName}</ClassText>
                </InnerContainer>
            </TouchableNativeFeedback>
        </Link>
    </OuterContainer>
}