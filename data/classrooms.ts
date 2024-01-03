import { z } from 'zod';
import { getTableItems } from './table';
import { TimetableJson } from './timetable';

export const ClassroomSchema = z.object({
    id: z.string(),
    name: z.string(),
    short: z.string(),
})

type ClassroomJson = z.infer<typeof ClassroomSchema>

export class Classroom {
    id: string;
    name: string;
    shortName: string;

    constructor(json: ClassroomJson){
        this.id = json.id;
        this.name = json.name;
        this.shortName = json.short;
    }
}

export function parseClassrooms(json: TimetableJson){
    return getTableItems(json,"classrooms",ClassroomSchema,e=>new Classroom(e));
}