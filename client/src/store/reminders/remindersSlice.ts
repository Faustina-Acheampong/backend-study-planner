import { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../createAppSlice";
import { ReminderType } from "@/types/reminder";

export interface RemindersSliceState {
    reminders: ReminderType[] | null;
};

const initialState: RemindersSliceState = {
    reminders: null
};

export const reminderSlice = createAppSlice({
    name: "reminder",
    initialState,
    reducers: (create) => ({
        setReminders: create.reducer((state, action: PayloadAction<ReminderType[] | null>) => {
            state.reminders = action.payload;
        }),
        clearReminders: create.reducer((state) => {
            state.reminders = null;
        }),
        markReminderAsRead: create.reducer((state, action: PayloadAction<string>) => {
            const newReminders = state.reminders?.map(i => {
                if (i.id === action.payload) {
                    return { ...i, unread: false }
                } else {
                    return i;
                }
            }) ?? null;
            state.reminders = newReminders;
        })
    }),
    selectors: {
        selectReminders: (reminder) => reminder.reminders,
    },
});

export const { clearReminders, markReminderAsRead, setReminders } = reminderSlice.actions;
export const { selectReminders } = reminderSlice.selectors;
