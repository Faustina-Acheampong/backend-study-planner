import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./user/userSlice";
import { courseSlice } from "./course/courseSlice";
import { reminderSlice } from "./reminders/remindersSlice";

const rootReducer = combineSlices(userSlice, courseSlice, reminderSlice);

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => {
    return configureStore({
        reducer: rootReducer
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
    ThunkReturnType,
    RootState,
    unknown,
    Action
>;
