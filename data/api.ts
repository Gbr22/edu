import { saveToCache } from "../storage/cache";
import { Substitutions, SubstitutionsSchema } from "./substitution";
import { Timetable, TimetableSchema } from "./timetable";
import { Versions, VersionsSchema } from "./versions";

function makeRequest(url: string, params: any[]){

    // the edupage api uses some sort of remote procedure call system
    // arguments are passed in '__args', the first parameter is always null
    
    // '__gsh' is constant, its value must be '00000000'
    // I don't know what it does, but it is required

    return fetch(url,{
        method:"POST",
        body: JSON.stringify({
            "__args":[null,...params],
            "__gsh":"00000000"
        }),
    }).then(r=>{
        if (r.status != 200){
            throw new Error(`Invalid status: ${r.status} ${r.statusText}`);
        }
        return r;
    }).then(r=>r.json());
}
export function getVersions(schoolId: string){
    let date = new Date();
    let month = date.getMonth()+1;
    let year = date.getFullYear();
    let schoolYear = year;
    if (month < 8){ 
        schoolYear--;
    }
    return makeRequest(
        "https://"+schoolId+".edupage.org/timetable/server/ttviewer.js?__func=getTTViewerData",
        [schoolYear]
    ).then(json=>{
        let parsed = VersionsSchema.parse(json);
        saveToCache(`versions-${schoolId}`,json);
        return new Versions(parsed);
    })
}
export function doesSchoolExist(schoolId: string){
    return getVersions(schoolId).then(()=>{
        return true;
    }).catch(()=>{
        return false;
    })
}
export function getTimetable(schoolId: string, id: string){
    return makeRequest(
        "https://"+schoolId+".edupage.org/timetable/server/regulartt.js?__func=regularttGetData",
        [id]
    ).then(json=>{
        let parsed = TimetableSchema.parse(json);
        saveToCache(`timetable-${schoolId}-${id}`,json);
        return new Timetable(parsed);
    })
}

export function getSubstitutions(schoolId: string, date: Date){
    const dateString = ([
        String(date.getFullYear()),
        String(date.getMonth()+1).padStart(2,'0'),
        String(date.getDate()).padStart(2,'0')
    ]).join("-");

    return makeRequest(
        "https://"+schoolId+".edupage.org/substitution/server/viewer.js?__func=getSubstViewerDayDataHtml",
        [{
            date: dateString,
            mode: "classes"
        }]
    ).then(json=>{
        try {
            let parsed = SubstitutionsSchema.parse(json);
            return new Substitutions(parsed);
        } catch(err){
            throw new Error(`Failed to parse json: ${JSON.stringify(json)} error: ${err}`);
        }
    });
}