import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@store/reducer'

export interface NavigatorState {
    tabDefault: string,
    openTabDefault: string,
}

export const initialState: NavigatorState = {
    tabDefault: "key_0",
    openTabDefault: ""
}   

export const navigatorSlice = createSlice({
    name: 'navigator',
    initialState,
    reducers: {
        navigateSceen: (state, {payload}: PayloadAction<{tabDefault: string, openTabDefault: string}>) => {
            state.tabDefault = payload.tabDefault;
            state.openTabDefault = payload.openTabDefault;
        },
    },
})

export const sliceActions = navigatorSlice.actions
export const navigatorReducer = navigatorSlice.reducer
export const navigatorSelector = (state: RootState) => state.navigator