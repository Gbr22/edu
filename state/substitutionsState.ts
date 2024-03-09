import { create } from "zustand";
import { getSubstitutions } from "../data/api";
import { globalState } from "../state/GlobalStore";
import { Substitutions as SubstitutionsData } from "../data/substitution";

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
    updateDate: (newDate: Date)=>{
        store.setState({
            date: newDate,
            currentSubstitutions: substitutionsState.get().substitutions.get(newDate.valueOf()),
        })
    },
    stepDateByDays: (numberOfDays: number)=>{
        const date = substitutionsState.get().date;
        const timestamp = date.valueOf();
        const MS = 1;
        const SECOND = 1000 * MS;
        const MINUTE = 60 * SECOND;
        const HOUR = 60 * MINUTE;
        const DAY = 24 * HOUR;
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
        const cachedSubs = substitutionsState.get().substitutions.get(date.valueOf());
        if (cachedSubs){
            store.setState({
                currentSubstitutions: cachedSubs
            })
        }
        getSubstitutions(schoolId,date).then((substitutions)=>{
            store.setState({
                currentSubstitutions: substitutions
            })
            substitutionsState.get().substitutions.set(date.valueOf(),substitutions);
        }).catch(err=>{
            const substitutions = new Error(err);
            store.setState({
                currentSubstitutions: substitutions
            })
        })
    }
})