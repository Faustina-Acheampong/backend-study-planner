export type ReminderType = {
    type: 'assignment' | 'courses';
    id: string;
    course_name?: string;
    assignment_title?: string;
    time_left?: number;
    unread: Boolean;
}
