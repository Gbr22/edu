import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useGlobalStore } from "../../state/GlobalStore";
import { useDaySelectorStore } from "./DaySelector";
import { Row } from "./Row";

interface DayProps {
    dayId: string
    classId: string
}

export function Day({dayId, classId}: DayProps){

    let timetable = useGlobalStore(state=>state.timetable);
    let day = timetable?.days.find(e=>e.id == dayId);
    
    // note: we don't use it as a hook, so the component doesn't rerender when the value changes.
    let selectedDay = useDaySelectorStore.getState().selectedDay;

    let isSelectedDay = day?.index == selectedDay;
    let [show, setShow] = useState<boolean>(isSelectedDay);

    useEffect(()=>{
        if (!show){
            setTimeout(()=>{
                setShow(true);
            },1)
        }
    },[]);

    if (!show){
        return <View></View>
    }

    return <View>
        { timetable?.periods.map(period=>{
            return <Row key={period.id} periodId={period.id} dayId={dayId} classId={classId}></Row>
        }) }
    </View>
}