import { TaskType } from "./task";
import { TimeType } from "./time";

export type UserType = {
    id: number,
    username: string,
    time?: TimeType[]
    tasks?: TaskType[]
};

export type LoginRequestProps = {
    email: string,
    password: string
};

export type LoginResponseProps = {
    accessToken: string,
    refreshToken: string,
    user: UserType
};

export type RegisterRequestProps = {
    email: string,
    username: string,
    password: string
};
