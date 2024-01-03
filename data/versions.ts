import { z } from 'zod';

export const VersionSchema = z.object({
    tt_num: z.preprocess(e=>String(e),z.string()),
    year: z.number(),
    text: z.string(),
    datefrom: z.string(),
})
type VersionJson = z.infer<typeof VersionSchema>

export const VersionsSchema = z.object({
    r: z.object({
        regular: z.object({
            default_num: z.preprocess(e=>String(e),z.string()),
            timetables: z.array(VersionSchema)
        })
    })
})
type VersionsJson = z.infer<typeof VersionsSchema>

export class Version {
    id: string;
    dateFrom: Date;
    text: string;

    constructor(json: VersionJson){
        this.id = json.tt_num;
        this.dateFrom = new Date(json.datefrom);
        this.text = json.text
    }
}
export class Versions {

    all: Version[]
    current?: Version;

    constructor(json: VersionsJson){
        this.all = json.r.regular.timetables.map(e=> new Version(e));
        this.all.sort((a,b)=>{
            return b.dateFrom.valueOf() - a.dateFrom.valueOf();
        })
        const currentId = json.r.regular.default_num;
        let current = this.all.find(e=>e.id == currentId);
        if (current){
            this.current = current;
        } else {
            this.current = this.all[0];
        }
    }
}