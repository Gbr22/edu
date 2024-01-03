import seedrandom from "seedrandom";
import { Theme } from "../styles/theme";
import { Classroom } from "./classrooms";
import { Division } from "./divisions";
import { Entry } from "./entries";
import { Group } from "./groups";
import { Lesson } from "./lessons";
import { Subject } from "./subjects";
import { Teacher } from "./teachers";
import { Timetable } from "./timetable";
import { Week } from "./weeks";

export interface CardData {
    entry: Entry
    lesson: Lesson
    subject: Subject
    teachers: Teacher[]
    classrooms: Classroom[]
    week: Week
    groups: Group[]
}

export interface PlaceholderCardData extends Partial<CardData> {
    groups: Group[]
}

export function getCardKey(data: CardData | PlaceholderCardData){
    if (isCardData(data)){
        return data.entry.id;
    } else {
        return data.groups.map(e=>e.id).join(",");
    }
}

export function isCardData(data: CardData | PlaceholderCardData): data is CardData {
    let props = ["entry","lesson","subject","teachers","classrooms","week","groups"];
    for(let prop of props){
        if (!(prop in data)){
            return false;
        }
    }
    return true;
}
export function isPlaceholderCardData(data: CardData | PlaceholderCardData): data is PlaceholderCardData {
    return !isCardData(data);
}

function joinUnique(arr: string[]){
    return [...new Set(arr)].join(", ");
}

export function getGroupText(card: CardData){
    return joinUnique(card.groups.map(e=>e.name));
}
export function getTeacherText(card: CardData){
    return joinUnique(card.teachers.map(e=>e.name));
}
export function getClassroomText(card: CardData){
    return joinUnique(card.classrooms.map(e=>e.name));
}
export function getShortClassroomText(card: CardData){
    return joinUnique(card.classrooms.map(e=>e.shortName));
}

function findCommonDivision(timetable: Timetable,cards: CardData[]): Division | undefined {
    let divisionCount = new Map<string,number>();
    cards.forEach(card=>{
        card.groups?.forEach(group=>{
            if (divisionCount.has(group.divisionId)){
                divisionCount.set(group.divisionId,(divisionCount.get(group.divisionId) as number)+1);
            } else {
                divisionCount.set(group.divisionId,1);
            }
        })
    })
    let divisions = [...divisionCount.entries()]
        .map(([key,value])=>({id: key,count: value}))
        .sort((a,b)=>{
            return b.count - a.count
        })
    
    let commonDivisionId = divisions[0]?.id;
    return timetable.divisions.find(e=>e.id == commonDivisionId);
}

export function getCardsInRow(timetable: Timetable, dayId: string, periodId: string, classId: string): (CardData | PlaceholderCardData)[] {
    let day = timetable.days.find(e=>e.id == dayId);
    let lessons = timetable.lessons;
    let cards = timetable.entires.filter(entry=>{
        return day?.match(entry.daysMask) && entry.periodId == periodId
    }).map(entry=>{
        let lesson = lessons.find(lesson=>lesson.id == entry.lessonId);
        if (!lesson){
            return;
        }
        
        let subject = timetable.subjects.find(e=>e.id == lesson?.subjectId);

        if (!subject){
            return;
        }

        let week = timetable.weeks.find(e=>e.match(entry.weeksMask) && e.masks.length == 1);

        if (!week){
            return;
        }

        let groups = lesson.groupIds
            .map(groupId=>timetable.groups.find(e=>e.id == groupId))
            .filter(e=>e != undefined) as Group[];

        let teachers = lesson.teacherIds
            .map(teacherId=>timetable.teachers.find(e=>e.id == teacherId))
            .filter(e=>e != undefined) as Teacher[];

        let classrooms = entry.classroomIds
            .map(classroomId=>timetable.classrooms.find(e=>e.id == classroomId))
            .filter(e=>e != undefined) as Classroom[];

        let card: CardData = {
            entry,
            lesson,
            subject,
            teachers,
            classrooms,
            week,
            groups,
        }
        return card;
    }).filter(card=>card != undefined && card.lesson?.classIds.includes(classId)) as CardData[];
    
    let cardsAndPlaceholders = [...cards] as (CardData | PlaceholderCardData)[];

    let division = findCommonDivision(timetable,cards);
    if (division){
        for (let groupId of division.groupIds){
            // if the group doesn't have a lesson in this row then create a placeholder for the group
            // all groups in the division must have either a card or a placeholder
            // this makes sure that when lessons that last more than one period overflow, they flow over the placeholder element instead of a card
            let exists = cards.find(e=>e.lesson.groupIds.includes(groupId)) != undefined;
            if (!exists){
                let group = timetable.groups.find(e=>e.id == groupId);
                if (!group){
                    continue;
                }

                cardsAndPlaceholders.push({
                    entry: undefined,
                    lesson: undefined,
                    subject: undefined,
                    teachers: undefined,
                    classrooms: undefined,
                    groups: [group],
                })
            }
        }
    }

    cardsAndPlaceholders.sort((a,b)=>{
        let aName = a.groups[0]?.name || "";
        let bName = b.groups[0]?.name || "";
        return aName.localeCompare(bName);
    })

    return cardsAndPlaceholders;
}