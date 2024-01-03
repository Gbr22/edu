import { create } from 'zustand'
import { getTimetable as getTimetableFromApi, getVersions as getVersionsFromApi } from '../data/api'
import { Timetable } from '../data/timetable'
import { Versions } from '../data/versions'
import { getTimetableFromCache, getVersionsFromCache } from '../storage/cache'
import NetInfo, { fetch } from "@react-native-community/netinfo";

export enum ErrorType {
    offline,
    unkown
}

interface GlobalState {
    timetable?: Timetable
    versions?: Versions
    schoolId?: string
    timetableId?: string
    error?: ErrorType
    updateTimetable: (schoolId: string, timetableId: string | undefined)=>Promise<void>
    updateTimetableFromCache: (schoolId: string, timetableId: string | undefined)=>Promise<void>
    updateTimetableFromApi: (schoolId: string, timetableId: string | undefined)=>Promise<void>
    updateTimetableFromFunctions: (
        schoolId: string, timetableId: string | undefined,
        getVersions: (schoolId: string)=>Promise<Versions | null>,
        getTimetable: (schoolId: string, timetableId: string)=>Promise<Timetable | null>
    )=>Promise<void>
}

export const useGlobalStore = create<GlobalState>((set,get)=>({
    async updateTimetable(schoolId, timetableId) {
        let isDifferentTimetable = schoolId != get().schoolId || timetableId != get().timetableId;
        if (!isDifferentTimetable && get().error == undefined){
            // if the timetable didn't change and there we no errors fetching it, then we don't need to update
            return;
        }

        set({
            schoolId,
            timetable: undefined,
            versions: undefined,
            error: undefined
        })

        const networkState = await fetch();
        const isInternetReachable = networkState.isConnected;

        get().updateTimetableFromCache(schoolId,timetableId).catch(err=>{
            if (!isInternetReachable){
                console.warn(err);
                set({error: ErrorType.offline})
            }
        })

        if (isInternetReachable){
            get().updateTimetableFromApi(schoolId,timetableId).catch(err=>{
                console.warn(err);
                set({error: ErrorType.unkown})
            })
        }
    },
    async updateTimetableFromFunctions(schoolId, timetableId, getVersions, getTimetable) {
        let versions = await getVersions(schoolId);
        if (!versions){
            throw new Error("Count not get versions");
        }
        set({versions});
        let currentVersion = versions.current;
        if (!currentVersion){
            return;
        }
        if (!timetableId){
            timetableId = currentVersion.id;
        }
        let cachedTimetable = await getTimetable(schoolId,timetableId);
        if (cachedTimetable) {
            set({timetable: cachedTimetable, timetableId})
        }
    },
    async updateTimetableFromCache(schoolId, timetableId) {
        return get().updateTimetableFromFunctions(
            schoolId,timetableId,
            getVersionsFromCache,getTimetableFromCache
        )
    },
    async updateTimetableFromApi(schoolId, timetableId) {
        return get().updateTimetableFromFunctions(
            schoolId,timetableId,
            getVersionsFromApi,getTimetableFromApi
        )
    }
}))