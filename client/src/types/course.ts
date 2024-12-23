import { NoteType } from "./note";
import { AssignmentType } from "./assignment";

type Days = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
type Status = 'Ongoing' | 'Upcoming' | 'Completed' | 'Archived';

export type CourseType = {
    id: string,
    course_name: string,
    course_day: Days,
    course_code: string,
    course_instructor: string,
    course_semester?: string,
    course_location?: string,
    course_cover_image?: string,
    course_description?: string,
    course_time: {
        start: string;
        end: string;
      };
    user_id: string,
    course_status: Status,
    is_archived: boolean,
    createdAt: string;
    updatedAt: string;
    notes?: NoteType[],
    assignments?: AssignmentType[]
};
