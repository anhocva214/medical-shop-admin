import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@store/reducer'
import { Categories } from 'src/models/categories'


export interface CategoriesState {
    categories: Categories[];
    loadingList: boolean;
    loadingDelete: boolean;
    loadingEdit: boolean;
}

export const initialState: CategoriesState = {
    categories: [],
    loadingList: false,
    loadingDelete: false,
    loadingEdit: false,
}

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories: (state, {payload}: PayloadAction<Categories[]>) => {
            state.categories = payload
        },
        setLoadingList: (state, {payload}: PayloadAction<boolean>) => {
            state.loadingList = payload
        }
    },
})

export const sliceActions = categoriesSlice.actions
export const categoriesReducer = categoriesSlice.reducer
export const categoriesSelector = (state: RootState) => state.categories