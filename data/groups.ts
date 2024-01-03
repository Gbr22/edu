import { z } from 'zod';
import { getTableItems } from './table';
import { TimetableJson } from './timetable';

export const GroupSchema = z.object({
    id: z.string(),
    name: z.string(),
    classid: z.string(),
    entireclass: z.boolean(),
    divisionid: z.string(),
    color: z.string()
})

type GroupJson = z.infer<typeof GroupSchema>

export class Group {
    id: string;
    name: string;
    classId: string;
    isEntireClass: boolean;
    divisionId: string;
    color: string;

    constructor(json: GroupJson){
        this.id = json.id;
        this.name = json.name;
        this.classId = json.classid;
        this.isEntireClass = json.entireclass;
        this.divisionId = json.divisionid;
        this.color = json.color;
    }
}

export function parseGroups(json: TimetableJson){
    return getTableItems(json,"groups",GroupSchema,e=>new Group(e));
}