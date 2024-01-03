import { z } from 'zod';
import { getTableItems } from './table';
import { TimetableJson } from './timetable';

export const DivisionSchema = z.object({
    id: z.string(),
    groupids: z.array(z.string())
})

type DivisionJson = z.infer<typeof DivisionSchema>

export class Division {
    id: string;
    groupIds: string[];

    constructor(json: DivisionJson){
        this.id = json.id;
        this.groupIds = json.groupids;
    }
}

export function parseDivisions(json: TimetableJson){
    return getTableItems(json,"divisions",DivisionSchema,e=>new Division(e))
}