import { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../createAppSlice";
import { LoginRequestProps, LoginResponseProps, RegisterRequestProps, UserType } from "@/types/user";
import { login, register, logout } from "./userAPI";

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
                    state.refreshToken = action.payload.refreshToken;
                    state.accessToken = action.payload.accessToken;
                    state.user = action.payload.user;
                },
                rejected: (state) => {
                    state.refreshToken = null;
                    state.accessToken = null;
                },
            },
        ),
        clearTokens: create.asyncThunk(
            async (refreshToken: string) => {
                const result = await logout(refreshToken);
            },
            {
                fulfilled: (state) => {
                    state = {
                        accessToken: null,
                        refreshToken: null
                    }
                },
                rejected: (state) => {

                },
            },
        )
    }),
    selectors: {
        selectAccessToken: (user) => user.accessToken,
        selectRefreshToken: (user) => user.refreshToken,
        selectUserId: (user) => user.user?.id,
        selectUser: (user) => user.user
    },
});

export const { clearTokens, setTokens, registerUser } = userSlice.actions;
export const { selectAccessToken, selectRefreshToken, selectUserId, selectUser } = userSlice.selectors;
