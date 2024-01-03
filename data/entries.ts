import { z } from 'zod';
import { getTableItems } from './table';
import { TimetableJson } from './timetable';

export const EntrySchema = z.object({
    id: z.string(),
    lessonid: z.string(),
    period: z.string(),
    days: z.string(),
    weeks: z.string(),
    classroomids: z.array(z.string())
})

type EntryJson = z.infer<typeof EntrySchema>

export class Entry {
    id: string;
    lessonId: string;
    periodId: string;
    daysMask: string;
    weeksMask: string;
    classroomIds: string[]

    constructor(json: EntryJson){
        this.id = json.id;
        this.lessonId = json.lessonid;
        this.periodId = json.period;
        this.daysMask = json.days;
        this.weeksMask = json.weeks;
        this.classroomIds = json.classroomids;
    }
}

export function parseEntires(json: TimetableJson){
    return getTableItems(json,"cards",EntrySchema,e=>new Entry(e))
}