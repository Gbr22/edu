import { create } from "zustand";
import { getSubstitutions } from "../data/api";
import { globalState, useGlobalStore } from "../state/GlobalStore";
import { Substitutions, Substitutions as SubstitutionsData } from "../data/substitution";
import { DAY, getWeekStart, truncateTime } from "../localization/date";
import { Class } from "../data/classes";
import { Day } from "../data/days";

function createInitalState(){
    return {
        date: new Date(),
        currentSubstitutions: undefined as SubstitutionsData | undefined | Error,
        substitutions: new Map<number,SubstitutionsData>()
    }
}

const store = create(()=>{
    return createInitalState();
})

const useStore = store;

export const substitutionsState = Object.freeze({
    store,
    use: store,
    get: store.getState,
    reset: ()=>{
        store.setState({
            ...createInitalState(),
            date: store.getState().date,
        })
    },
    getFromMap: (date: Date | number): Substitutions | undefined =>{
        return store.getState().substitutions.get(truncateTime(date))
    },
    insertIntoMap: (date: Date | number, substitutions: Substitutions)=>{
        store.getState().substitutions.set(truncateTime(date),substitutions);
    },
    updateDate: (newDate: Date)=>{
        store.setState({
            date: newDate,
            currentSubstitutions: substitutionsState.get().substitutions.get(truncateTime(newDate)),
        })
    },
    stepDateByDays: (numberOfDays: number)=>{
        const date = substitutionsState.get().date;
        const timestamp = date.valueOf();
        const newTimestamp = timestamp + numberOfDays * DAY;
        const newDate = new Date(newTimestamp);
        substitutionsState.updateDate(newDate);
    },
    refresh: ()=>{
        const schoolId = globalState.get().schoolId;
        const state = store.getState();
        const date = state.date;
        if (!schoolId){
            return;
        }
        const cachedSubs = store.getState().substitutions.get(truncateTime(date));
        if (cachedSubs){
            store.setState({
                currentSubstitutions: cachedSubs
            })
        }
        getSubstitutions(schoolId,date).then((substitutions)=>{
            store.setState({
                currentSubstitutions: substitutions
            })
            substitutionsState.get().substitutions.set(truncateTime(date),substitutions);
        }).catch(err=>{
            const substitutions = new Error(err);
            store.setState({
                currentSubstitutions: substitutions
            })
        })
    }
})

export function matchSubstitutionsForLesson(props: {
        classId: string,
        periodText: string,
        classes: Class[],
        substitutions: Substitutions | null
}){
    if (!props.substitutions){
        return;
    }
    const classObject = props.classes.find(c=>c.id === props.classId);
    const substitutionEntry = props.substitutions.entries.find(e=>
        (e.className === classObject?.shortName || e.className === classObject?.name)
    );
    const entry = substitutionEntry?.items.find(item=>item.period === props.periodText);
    return entry;
}