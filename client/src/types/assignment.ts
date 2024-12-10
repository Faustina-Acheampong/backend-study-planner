import { NoteType } from "./note";

type AssignmentCategory = 'category1' | 'category2';
type Status = 'in progress' | 'not started' | 'completed';

export type AssignmentType = {
    id: string,
    assignment_title: string,
    assignment_category: AssignmentCategory,
    assignment_status: Status,
    assignment_cover_image: string,
    assignment_due_date: Date,
    course_id: string,
    notes?: NoteType[]
};
