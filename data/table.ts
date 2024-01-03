import { z } from "zod";
import type { Schema } from 'zod';
import { TimetableJson } from "./timetable";

function createTableSchema(id: string, ItemSchema?: Schema){
    const TableSchema = z.object({
        id: z.literal(id),
        def: z.object({
            name: z.string(),
            item_name: z.string()
        }),
        data_rows: z.array(ItemSchema || z.unknown())
    })
    return TableSchema;
}
export function getTableData(array: unknown[], id: string, itemSchema?: Schema) {
    const TableSchema = createTableSchema(id,itemSchema);
    for(let e of array){
        let result = TableSchema.safeParse(e);
        if (result.success){
            return result.data;
        }
    }
    throw new Error("No object matching the provided schema was found in the array");
}
export function getTableItems<ResultType>(json: TimetableJson, id: string, schema: Schema, factory: (itemJson: any)=>ResultType): ResultType[] {
    return getTableData(json.r.dbiAccessorRes.tables, id, schema)
        .data_rows.map(factory);
}