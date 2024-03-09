import { z } from 'zod';
import * as a from "fast-html-parser";

export const SubstitutionsSchema = z.object({
    r: z.string()
});

export type SubstitutionsJson = z.infer<typeof SubstitutionsSchema>

export interface SubstitutionPeriodInfo {
    period: string | null;
    info: string | null;
}

export interface SubstitutionEntry {
    className: string | null;
    items: SubstitutionPeriodInfo[];
}

function cleanPeriodText(text: string | null): string | null {
    if (text === null) {
        return null;
    }
    text = text.trim();
    if (text.startsWith("(") && text.endsWith(")")){
        text = text.substring(1,text.length-1);
    }
    text = text.replace(/((\s|\t)*-(\s|\t)+)|((\s|\t)+-(\s|\t)*)/g,"-");
    return text;
}

export class Substitutions {
    entries: SubstitutionEntry[]

    constructor(json: SubstitutionsJson){
        const html = json.r;
        const document = a.parse(`
            <html>
                <body>
                ${html}
                </body>
            </html>
        `)
        const sections = document.querySelectorAll(".section");
        const entires = sections.map(section=>{
            const header = section.querySelector(".header");
            const className = header?.structuredText.trim() || null;
            const rows = section.querySelectorAll(".row");
            const items = rows.map(row=>{
                const period = cleanPeriodText(row.querySelector(".period")?.structuredText || null);
                const info = row.querySelector(".info")?.structuredText || null;
                return {
                    period,
                    info
                } satisfies SubstitutionPeriodInfo;
            })
            return {
                className,
                items,
            } satisfies SubstitutionEntry;
        })
        this.entries = entires;
    }
}