import { z } from 'zod';
import { getTableItems } from './table';
import { TimetableJson } from './timetable';

export const DaySchema = z.object({
    id: z.string(),
    vals: z.array(z.string()),
    val: z.number().or(z.null()),
    name: z.string(),
    short: z.string(),
    typ: z.string()
})

type DayJson = z.infer<typeof DaySchema>

export class Day {
    id: string;
    name: string;
    shortName: string;
    index: number | null;
    masks: string[];

    match(mask: string){
        return this.masks.includes(mask);
    }

    constructor(json: DayJson){
        this.id = json.id;
        this.name = json.name;
        this.shortName = json.short;
        this.index = json.val;
        this.masks = json.vals;
    }
}

export function parseDays(json: TimetableJson){
    return getTableItems(json,"daysdefs",DaySchema,e=>new Day(e))
}