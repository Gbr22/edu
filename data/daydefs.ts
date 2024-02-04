import { z } from 'zod';
import { getTableItems } from './table';
import { TimetableJson } from './timetable';

export const DayDefSchema = z.object({
    id: z.string(),
    vals: z.array(z.string()),
})

type DayDefJson = z.infer<typeof DayDefSchema>

export class DayDef {
    id: string;
    masks: string[];

    match(mask: string){
        return this.masks.includes(mask);
    }

    constructor(json: DayDefJson){
        this.id = json.id;
        this.masks = json.vals;
    }
}

export function parseDayDefs(json: TimetableJson){
    return getTableItems(json,"daysdefs",DayDefSchema,e=>new DayDef(e))
}