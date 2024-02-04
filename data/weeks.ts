import { TimetableJson } from './timetable';
import { WeekDef, parseWeekDefs } from './weekdefs';
import { WeekText, parseWeekTexts } from './weektexts';

export class Week {
    id: string;
    name: string;
    shortName: string;
    index: number;
    masks: string[];

    match(mask: string){
        return mask[this.index] === "1";
    }

    constructor(def: WeekDef, text: WeekText){
        this.id = def.id;
        this.name = text.name;
        this.shortName = text.shortName;
        this.index = Number(text.id);
        this.masks = def.masks;
    }
}

export function parseWeeks(json: TimetableJson){
    const weekDefs = parseWeekDefs(json);
    const weekTexts = parseWeekTexts(json);
    const weeks: Week[] = [];
    for (let i=0; i < weekTexts.length; i++){
        const dayText = weekTexts[i];
        const dayDef = weekDefs[i];
        if (!dayText || !dayDef){
            continue;
        }
        weeks.push(new Week(dayDef,dayText));
    }
    return weeks;
}