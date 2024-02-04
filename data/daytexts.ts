import { z } from 'zod';
import { getTableItems } from './table';
import { TimetableJson } from './timetable';

export const DayTextSchema = z.object({
    id: z.string(),
    name: z.string(),
    short: z.string(),
})

type DayTextJson = z.infer<typeof DayTextSchema>

export class DayText {
    id: string;
    name: string;
    shortName: string;

    constructor(json: DayTextJson){
        this.id = json.id;
        this.name = json.name;
        this.shortName = json.short;
    }
}

export function parseDayTexts(json: TimetableJson){
    return getTableItems(json,"days",DayTextSchema,e=>new DayText(e))
}