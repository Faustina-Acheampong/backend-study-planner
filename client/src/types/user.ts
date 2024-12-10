import { TaskType } from "./task";
import { TimeType } from "./time";

export type UserType = {
    id: number,
    username: string,
    time?: TimeType[]
    tasks?: TaskType[]
};
