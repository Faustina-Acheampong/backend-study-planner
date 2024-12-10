import { TimeType } from "./time";

type Priority = 'Low' | 'Medium' | 'High';

export type TaskType = {
    id: string,
    task_title: string,
    task_description?: string,
    task_priority?: Priority,
    task_due_date?: Date,
    is_task_completed: boolean,
    user_id: string,
    assignment_id?: string,
    time?: TimeType[]
};
