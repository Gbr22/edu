export const MS = 1;
export const SECOND = 1000 * MS;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export function getWeekDay(date: Date){
    const originalDay = date.getDay();
    const offsetDay = originalDay - 1;
    const normalDay = offsetDay == -1 ? 6 : offsetDay;
    return normalDay;
}

export function getWeekStart(date: Date){
    const day = getWeekDay(date);
    const timestamp = date.valueOf();
    const weekstartTimestamp = timestamp - day * DAY;
    return weekstartTimestamp;
}

export function truncateTime(dateTime: Date | number){
    const ms = dateTime.valueOf();
    const rounded = Math.floor(ms/DAY)*DAY;
    return rounded;
}