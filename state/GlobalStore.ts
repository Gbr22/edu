import { create } from 'zustand'
import { getTimetable as getTimetableFromApi, getVersions as getVersionsFromApi } from '../data/api'
import { Timetable } from '../data/timetable'
import { Versions } from '../data/versions'
import { getTimetableFromCache, getVersionsFromCache } from '../storage/cache'
import { fetch as getNetInfo } from "@react-native-community/netinfo";
import { substitutionsState } from './substitutionsState'

export enum ErrorType {
    offline,
    unknown
}

interface GlobalState {
    timetable?: Timetable
    versions?: Versions
    schoolId?: string
    timetableId?: string
    error?: ErrorType
}

export const useGlobalStore = create<GlobalState>((set,get)=>({}))

const store = useGlobalStore;

export async function updateTimetable(schoolId: string, timetableId?: string){
    const state = store.getState();
    let isDifferentTimetable = schoolId != state.schoolId || timetableId != state.timetableId;
    if (!isDifferentTimetable && state.error == undefined){
        // if the timetable didn't change and there we no errors fetching it, then we don't need to update
        return;
    }

    store.setState({
        schoolId,
        timetable: undefined,
        versions: undefined,
        error: undefined
    })

    substitutionsState.reset();

    const networkState = await getNetInfo();
    const isInternetReachable = networkState.isConnected;

    updateTimetableFromCache(schoolId,timetableId).catch(err=>{
        if (!isInternetReachable){
            console.warn(err);
            store.setState({error: ErrorType.offline})
        }
    })

    if (isInternetReachable){
        updateTimetableFromApi(schoolId,timetableId).catch(err=>{
            console.warn("Could not update timetable form api.",err);
            store.setState({error: ErrorType.unknown})
        })
    }
}

export async function updateTimetableFromFunctions(
    schoolId: string,
    timetableId: string | undefined,
    getVersions: (schoolId: string)=>Promise<Versions | null>,
    getTimetable: (schoolId: string, timetableId: string)=>Promise<Timetable | null>
) {
    let versions = await getVersions(schoolId);
    if (!versions){
        throw new Error("Count not get versions");
    }
    store.setState({versions});
    let currentVersion = versions.current;
    if (!currentVersion){
        return;
    }
    if (!timetableId){
        timetableId = currentVersion.id;
    }
    let cachedTimetable = await getTimetable(schoolId,timetableId);
    if (cachedTimetable) {
        store.setState({timetable: cachedTimetable, timetableId})
    }
}
export async function updateTimetableFromCache(schoolId: string, timetableId?: string) {
    return updateTimetableFromFunctions(
        schoolId,timetableId,
        getVersionsFromCache,getTimetableFromCache
    )
}
export async function updateTimetableFromApi(schoolId: string, timetableId?: string) {
    return updateTimetableFromFunctions(
        schoolId,timetableId,
        getVersionsFromApi,getTimetableFromApi
    )
}

export const globalState = Object.freeze({
    store: useGlobalStore,
    use: useGlobalStore,
    get: useGlobalStore.getState,
    refresh: ()=>{
        let {schoolId, timetableId} = store.getState();
        if (!schoolId){
            return;
        }
        updateTimetable(schoolId, timetableId);
    }
})