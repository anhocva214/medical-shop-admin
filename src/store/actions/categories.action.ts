import { AppThunk, dispatch } from '@store/index'
import { sliceActions } from '@slices/categories.slice'
import { categoriesApis } from '@apis/categories.api'
import {message} from 'antd'
import { Categories } from 'src/models/categories'

export const getCategories = (): AppThunk => async (dispatch) => {
    try{
        dispatch(sliceActions.setLoadingList(true))
        let res = await categoriesApis.getList();
        dispatch(sliceActions.setCategories(res.data.map(item => new Categories(item))))
    }
    catch(err){
        message.error(err?.message);
        // console.log(err)
    }
    dispatch(sliceActions.setLoadingList(false))

}

export const createCategories = (caterories: Categories): AppThunk => async (dispatch) => {
    try{
        // dispatch(sliceActions.setLoadingConfirm(true))
        // let res = await categoriesApis.create(caterories)
        // dispatch(sliceActions.addCategories(new Categories(res.data)))
    }
    catch(err){
        message.error(err?.message)
    }
    // dispatch(sliceActions.setLoadingConfirm(false))
}
