import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@store/reducer'

export interface NavigatorState {
    tabDefault: string,
    openTabDefault: string,
    loadingPage: boolean,
}

export const initialState: NavigatorState = {
    tabDefault: "key_0",
    openTabDefault: "",
    loadingPage: false
}   

export const navigatorSlice = createSlice({
    name: 'navigator',
    initialState,
    reducers: {
        navigateSceen: (state, {payload}: PayloadAction<{tabDefault: string, openTabDefault: string}>) => {
            state.tabDefault = payload.tabDefault;
            state.openTabDefault = payload.openTabDefault;
        },
        loadingPage: (state, {payload}: PayloadAction<boolean>)=>{
            state.loadingPage = payload
        }
    },
})

export const sliceActions = navigatorSlice.actions
export const navigatorReducer = navigatorSlice.reducer
export const navigatorSelector = (state: RootState) => state.navigator