import { useEffect, useMemo, useState } from "react";
import { View, Text } from "react-native";
import { useGlobalStore } from "../../state/GlobalStore";
import { useDaySelectorStore } from "./DaySelector";
import { Row } from "./Row";
import { Substitutions } from "../../data/substitution";
import { getSubstitutions } from "../../data/api";
import { DAY, getWeekStart } from "../../localization/date";
import { substitutionsState } from "../../state/substitutionsState";

interface DayProps {
    dayId: string
    classId: string
}

export function Day({dayId, classId}: DayProps){

    const { timetable, schoolId } = useGlobalStore(state=>{
        return {
            timetable: state.timetable,
            schoolId: state.schoolId
        }
    });
    const day = timetable?.days.find(e=>e.id == dayId);
    
    // note: we don't use it as a hook, so the component doesn't rerender when the value changes.
    const selectedDay = useDaySelectorStore.getState().selectedDay;

    const isSelectedDay = day?.index == selectedDay;
    const [show, setShow] = useState<boolean>(isSelectedDay);
    const [currentDate, _] = useState(new Date());
    const dayIndex = day?.index ?? NaN;
    const week = getWeekStart(currentDate);
    const dayDate = new Date(week + dayIndex * DAY);
    const [substitutions, setSubstitutions] = useState<Substitutions | null>(substitutionsState.getFromMap(dayDate) ?? null);
    

    useEffect(()=>{
        if (!day || !schoolId || show){
            return;
        }
        getSubstitutions(schoolId, dayDate).then(substitutions=>{
            substitutionsState.insertIntoMap(dayDate,substitutions);
            setSubstitutions(substitutions);
        }).catch(err=>{
            console.warn(`Could not get substitutions debug info: ${JSON.stringify({
                schoolId,
                dayDate,
                week,
                dayIndex,
                day,
                currentDate
            })} err: ${err}`);
        })
    })

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
            return <Row key={period.id} periodId={period.id} dayId={dayId} classId={classId} substitutions={substitutions}></Row>
        }) }
    </View>
}