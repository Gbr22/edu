import AsyncStorage from "@react-native-async-storage/async-storage";
import { z } from "zod";
import { Timetable, TimetableSchema } from "../data/timetable";
import { Versions, VersionsSchema } from "../data/versions";

export function saveToCache(key: string, value: unknown){

    let timestamp = Date.now();

    let item = {
        value,
        timestamp
    }

    AsyncStorage.setItem("cache/"+key,JSON.stringify(item))
}

const CacheItemSchema = z.object({
    value: z.unknown(),
    timestamp: z.number()
})

export async function getCacheEntry(key: string) {

    let itemString = await AsyncStorage.getItem("cache/"+key).catch(err=>null);

    if (itemString == null){
        return null;
    }

    let object: unknown;
    try {
        object = JSON.parse(itemString);
    } catch(err){
        return null;
    }

    let parseResult = CacheItemSchema.safeParse(object);
    if (!parseResult.success){
        return null;
    }

    return parseResult.data;
}

export async function getVersionsFromCache(schoolId: string) {
    let json = await getCacheEntry(`versions-${schoolId}`);
    if (!json){
        return null;
    }
    let parsed = VersionsSchema.safeParse(json.value);
    if (!parsed.success){
        return null;
    }
    return new Versions(parsed.data);
}

export function doesSchoolExistInCache(schoolId: string){
    return getVersionsFromCache(schoolId).then((data)=>{
        return data != null;
    }).catch(()=>{
        return false;
    })
}

export async function getTimetableFromCache(schoolId: string, id: string) {
    let json = await getCacheEntry(`timetable-${schoolId}-${id}`);
    if (!json){
        return null;
    }
    let parsed = TimetableSchema.safeParse(json.value);
    if (!parsed.success){
        return null;
    }
    return new Timetable(parsed.data);
}