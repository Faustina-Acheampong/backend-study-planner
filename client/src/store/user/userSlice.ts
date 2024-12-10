import { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../createAppSlice";
import { UserType } from "@/types/user";

export interface UserSliceState {
    token: string | null,
    user?: UserType
};

const initialState: UserSliceState = {
    token: null
};

export const userSlice = createAppSlice({
    name: "user",
    initialState,
    reducers: (create) => ({
        // setToken: create.asyncThunk(
        //     async (password: string) => {
        //         const token = await adminLogin(password);
        //         return token;
        //     },
        //     {
        //         fulfilled: (state, action: PayloadAction<string | null>) => {
        //             state.token = action.payload;
        //         },
        //         rejected: (state) => {
        //             state.token = null;
        //         },
        //     },
        // ),
        clearToken: create.reducer((state) => {
            state.token = null;
        }),
    }),
    selectors: {
        selectToken: (user) => user.token,
    },
});

export const { clearToken } = userSlice.actions;
export const { selectToken } = userSlice.selectors;
