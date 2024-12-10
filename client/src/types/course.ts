import { NoteType } from "./note";

type Days = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
type Semester = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type CourseType = {
    course_name: string,
    course_day: Days,
    course_code: string,
    course_instructor: string,
    course_semester: Semester,
    course_location: string,
    course_cover_image: string,
    course_description: string,
    course_time: number,
    user_id: number,
    notes?: NoteType[]
};
