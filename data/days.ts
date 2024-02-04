import { TimetableJson } from './timetable';
import { DayDef, parseDayDefs } from './daydefs';
import { DayText, parseDayTexts } from './daytexts';


export class Day {
    id: string;
    name: string;
    shortName: string;
    index: number;
    masks: string[];

    match(mask: string){
        return mask[this.index] === "1";
    }

    constructor(def: DayDef, text: DayText){
        this.id = def.id;
        this.name = text.name;
        this.shortName = text.shortName;
        this.index = Number(text.id);
        this.masks = def.masks;
    }
}

export function parseDays(json: TimetableJson){
    const dayDefs = parseDayDefs(json);
    const dayTexts = parseDayTexts(json);
    const days: Day[] = [];
    for (let i=0; i < dayTexts.length; i++){
        const dayText = dayTexts[i];
        const dayDef = dayDefs[i];
        if (!dayText || !dayDef){
            continue;
        }
        days.push(new Day(dayDef,dayText));
    }
    return days;
}