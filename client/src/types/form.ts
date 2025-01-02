import { Days, Status } from '@/types/course';

export type CreateCourseFormData = {
    course_name: string;
    course_day: Days;
    course_code: string;
    course_instructor: string;
    course_time: {
        start: string;
        end: string;
    };
    course_status: Status;
    course_semester?: string;
    course_location?: string;
    course_cover_image?: string;
    course_description?: string;
    user_id: string;
};