import { z } from 'zod';
import { getTableItems } from './table';
import { TimetableJson } from './timetable';

export const PeriodSchema = z.object({
    id: z.string(),
    starttime: z.string(),
    endtime: z.string(),
    period: z.string(),
})

export type PeriodJson = z.infer<typeof PeriodSchema>

export class Period {

    id: string;
    startTime: string;
    endTime: string;
    name: string;

    constructor(json: PeriodJson){
        this.id = json.id;
        this.startTime = json.starttime;
        this.endTime = json.endtime;
        this.name = json.period;
    }
}

export function parsePeriods(json: TimetableJson){
    return getTableItems(json,"periods",PeriodSchema,e=>new Period(e))
}

export function getPeriodInfo(props: {
    periods: Period[],
    duration: number,
    periodId: string
}){
    let startPeriodIndex = props.periods.findIndex(e=>e.id == props.periodId);
    let startPeriod = props.periods[startPeriodIndex];
    let endPeriod = props.periods[startPeriodIndex+(props.duration-1)];

    let periodText = startPeriod.name;

    if (startPeriod != endPeriod){
        periodText += `-${endPeriod.name}`;
    }

    return {
        startPeriod,
        endPeriod,
        periodText
    };
}