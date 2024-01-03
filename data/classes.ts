import { z } from 'zod';
import { getTableItems } from './table';
import { TimetableJson } from './timetable';

export const ClassSchema = z.object({
    id: z.string(),
    name: z.string(),
    short: z.string(),
    color: z.string(),
})

type ClassJson = z.infer<typeof ClassSchema>

export class Class {
    id: string;
    name: string;
    shortName: string;
    color: string;

    constructor(json: ClassJson){
        this.id = json.id;
        this.name = json.name;
        this.shortName = json.short;
        this.color = json.color;
    }
}

export function parseClasses(json: TimetableJson){
    return getTableItems(json,"classes",ClassSchema,e=>new Class(e));
}