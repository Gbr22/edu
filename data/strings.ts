import { getTableData } from "./table";
import { TimetableJson } from "./timetable";

export class Strings {

    teacher: string;
    classroom: string;
    group: string;
    week: string;

    constructor(json: TimetableJson){
        let tables = json.r.dbiAccessorRes.tables;
        this.teacher = getTableData(tables,"teachers").def.item_name;
        this.classroom = getTableData(tables,"classrooms").def.item_name;
        this.group = getTableData(tables,"groups").def.item_name;
        this.week = getTableData(tables,"weeksdefs").def.item_name;
    }
}