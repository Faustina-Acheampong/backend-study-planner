import { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../createAppSlice";
import { LoginRequestProps, LoginResponseProps, RegisterRequestProps, UserType } from "@/types/user";
import { login, register } from "./userAPI";

export interface UserSliceState {
    accessToken: string | null,
    refreshToken: string | null,
    user?: UserType
};

const initialState: UserSliceState = {
    accessToken: null,
    refreshToken: null
};

export const userSlice = createAppSlice({
    name: "user",
    initialState,
    reducers: (create) => ({
        registerUser: create.asyncThunk(
            async (data: RegisterRequestProps) => {
                const result = await register(data);
                return result;
            },
            {
                fulfilled: () => {

                },
                rejected: (state) => {
                    state.refreshToken = null;
                    state.accessToken = null;
                },
            },
        ),
        setTokens: create.asyncThunk(
            async (data: LoginRequestProps) => {
                const result = await login(data);
                return result;
            },
            {
                fulfilled: (state, action: PayloadAction<LoginResponseProps>) => {
                    state = action.payload;
                },
                rejected: (state) => {
                    state.refreshToken = null;
                    state.accessToken = null;
                },
            },
        ),
        clearTokens: create.reducer((state) => {
            state.accessToken = null;
            state.refreshToken = null;
        }),
    }),
    selectors: {
        selectAccessToken: (user) => user.accessToken,
        selectRefreshToken: (user) => user.refreshToken
    },
});

export const { clearTokens, setTokens, registerUser } = userSlice.actions;
export const { selectAccessToken, selectRefreshToken } = userSlice.selectors;
