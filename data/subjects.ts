import { z } from 'zod';
import { getTableItems } from './table';
import { TimetableJson } from './timetable';

export const SubjectSchema = z.object({
    id: z.string(),
    name: z.string(),
    short: z.string(),
    color: z.string()
})

type SubjectJson = z.infer<typeof SubjectSchema>

export class Subject {
    id: string;
    name: string;
    shortName: string;
    color: string;

    constructor(json: SubjectJson){
        this.id = json.id;
        this.name = json.name;
        this.shortName = json.short;
        this.color = json.color;
    }
}

export function parseSubjects(json: TimetableJson){
    return getTableItems(json,"subjects",SubjectSchema,e=>new Subject(e))
}