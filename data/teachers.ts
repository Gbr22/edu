import { z } from 'zod';
import { getTableItems } from './table';
import { TimetableJson } from './timetable';

export const TeacherSchema = z.object({
    id: z.string(),
    short: z.string(),
})

type TeacherJson = z.infer<typeof TeacherSchema>

export class Teacher {
    id: string;
    name: string;

    constructor(json: TeacherJson){
        this.id = json.id;
        this.name = json.short;
    }
}

export function parseTeachers(json: TimetableJson){
    return getTableItems(json,"teachers",TeacherSchema,e=>new Teacher(e))
}