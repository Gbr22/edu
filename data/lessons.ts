import { z } from 'zod';
import { getTableItems } from './table';
import { TimetableJson } from './timetable';

export const LessonSchema = z.object({
    id: z.string(),
    subjectid: z.string(),
    teacherids: z.array(z.string()),
    groupids: z.array(z.string()),
    classids: z.array(z.string()),
    count: z.number(),
    durationperiods: z.number(),
})

type LessonJson = z.infer<typeof LessonSchema>

export class Lesson {
    id: string;
    subjectId: string;
    teacherIds: string[];
    groupIds: string[];
    classIds: string[];
    duration: number;

    constructor(json: LessonJson){
        this.id = json.id;
        this.subjectId = json.subjectid;
        this.teacherIds = json.teacherids;
        this.groupIds = json.groupids;
        this.classIds = json.classids;
        this.duration = json.durationperiods;
    }
}

export function parseLessons(json: TimetableJson){
    return getTableItems(json,"lessons",LessonSchema,e=>new Lesson(e))
}