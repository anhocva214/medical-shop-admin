import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@store/reducer'
import { Categories } from 'src/models/categories'
import {IErrorForm} from '@models/form-errors.model'

export interface CategoriesState {
    categories: Categories[];
    loadingList: boolean;
    loadingDelete: boolean;
    loadingComfirm: boolean;
    loadingUpdate: boolean;
    formErrors: IErrorForm[],
    apiStatus: 'success' | 'failure'
}

export const initialState: CategoriesState = {
    categories: [],
    loadingList: false,
    loadingDelete: false,
    loadingComfirm: false,
    formErrors: [], 
    apiStatus: null, 
    loadingUpdate: false
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
        },
        loadingDelete: (state) => {
            state.loadingDelete = true
        },
        deleteSuccess: (state, {payload}: PayloadAction<string>) => {
            state.loadingDelete = false;
            state.categories = state.categories.filter(item => item.id != payload)
            state.formErrors = []
        },
        deleteFailure: (state, {payload}: PayloadAction<IErrorForm[]>) => {
            state.loadingDelete = false;
            state.formErrors = payload
        }

    },
})

export const sliceActions = categoriesSlice.actions
export const categoriesReducer = categoriesSlice.reducer
export const categoriesSelector = (state: RootState) => state.categories