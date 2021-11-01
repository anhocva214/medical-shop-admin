import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@store/reducer'
import { User } from 'src/models/response/user.model'

export interface UserState {
    user: User;
    loadingLogin: boolean;
    auth: boolean;
}

export const initialState: UserState = {
    user: new User(),
    loadingLogin: false,
    auth: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loadingLogin: (state)=>{
            state.loadingLogin = true
        },
        loginSuccess: (state, {payload}: PayloadAction<User>) => {
            state.user = payload;
            state.loadingLogin = false;
            state.auth = true;
        },
        loginFailure: (state) => {
            state.user = new User();
            state.loadingLogin = false;
            state.auth = false;

        }
    },
})

export const sliceActions = userSlice.actions
export const userReducer = userSlice.reducer
export const userSelector = (state: RootState) => state.user