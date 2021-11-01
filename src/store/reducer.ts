import { combineReducers } from '@reduxjs/toolkit'

/* PLOP_INJECT_IMPORT */
import { categoriesReducer } from './slices/categories.slice';
import { navigatorReducer } from './slices/navigator.slice';
import { userReducer } from './slices/user.slice'
import {alertReducer} from './slices/alert.slice'


const rootReducer = combineReducers({
    /* PLOP_INJECT_USE */
	categories: categoriesReducer,
	navigator: navigatorReducer,
    user: userReducer,
    alert: alertReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer