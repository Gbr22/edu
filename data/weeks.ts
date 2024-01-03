import { z } from 'zod';
import { getTableItems } from './table';
import { TimetableJson } from './timetable';

export const WeekSchema = z.object({
    id: z.string(),
    name: z.string(),
    short: z.string(),
    vals: z.array(z.string()),
    val: z.number().or(z.null()),
    typ: z.string(),
})

type WeekJson = z.infer<typeof WeekSchema>

export class Week {
    id: string;
    name: string;
    shortName: string;
    index: number | null;
    masks: string[];

    match(mask: string){
        return this.masks.includes(mask);
    }

    constructor(json: WeekJson){
        this.id = json.id;
        this.name = json.name;
        this.shortName = json.short;
        this.index = json.val;
        this.masks = json.vals;
    }
}

export function parseWeeks(json: TimetableJson){
    return getTableItems(json,"weeksdefs",WeekSchema,e=>new Week(e))
}