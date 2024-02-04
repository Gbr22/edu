import { z } from 'zod';
import { getTableItems } from './table';
import { TimetableJson } from './timetable';

export const WeekDefSchema = z.object({
    id: z.string(),
    vals: z.array(z.string()),
})

type WeekDefJson = z.infer<typeof WeekDefSchema>

export class WeekDef {
    id: string;
    masks: string[];

    match(mask: string){
        return this.masks.includes(mask);
    }

    constructor(json: WeekDefJson){
        this.id = json.id;
        this.masks = json.vals;
    }
}

export function parseWeekDefs(json: TimetableJson){
    return getTableItems(json,"weeksdefs",WeekDefSchema,e=>new WeekDef(e))
}