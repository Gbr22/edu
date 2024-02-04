import { z } from 'zod';
import { getTableItems } from './table';
import { TimetableJson } from './timetable';

export const WeekTextSchema = z.object({
    id: z.string(),
    name: z.string(),
    short: z.string(),
})

type WeekTextJson = z.infer<typeof WeekTextSchema>

export class WeekText {
    id: string;
    name: string;
    shortName: string;

    constructor(json: WeekTextJson){
        this.id = json.id;
        this.name = json.name;
        this.shortName = json.short;
    }
}

export function parseWeekTexts(json: TimetableJson){
    return getTableItems(json,"weeks",WeekTextSchema,e=>new WeekText(e))
}