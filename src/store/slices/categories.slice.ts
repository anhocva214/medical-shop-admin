import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@store/reducer'
import { Categories } from 'src/models/categories'
import {IErrorForm} from '@models/form-errors.model'

export interface CategoriesState {
    categories: Categories[];
    loadingList: boolean;
    loadingDelete: boolean;
    loadingComfirm: boolean;
    formErrors: IErrorForm[],
    apiStatus: 'success' | 'failure'
}

export const initialState: CategoriesState = {
    categories: [],
    loadingList: false,
    loadingDelete: false,
    loadingComfirm: false,
    formErrors: [], 
    apiStatus: null
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
        },
        loadingComfirm: (state) =>{
            state.loadingComfirm = true
        },
        createSuccess: (state, {payload}: PayloadAction<Categories>) => {
            state.categories.push(payload)
            state.apiStatus = 'success'
            state.loadingComfirm = false
            state.formErrors = []
        },
        createFailure: (state, {payload}: PayloadAction<IErrorForm[]>) =>{
            state.apiStatus = 'failure'
            state.loadingComfirm = false
            state.formErrors = payload
        }
    },
})

export const sliceActions = categoriesSlice.actions
export const categoriesReducer = categoriesSlice.reducer
export const categoriesSelector = (state: RootState) => state.categories