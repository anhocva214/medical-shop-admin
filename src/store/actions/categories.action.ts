import { AppThunk, dispatch } from '@store/index'
import { sliceActions } from '@slices/categories.slice'
import { categoriesApis } from '@apis/categories.api'
import {message} from 'antd'
import { Categories } from 'src/models/categories'

const getCategories = (): AppThunk => async (dispatch) => {
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

const createCategories = (): AppThunk => async (dispatch) => {
    
}


export const categoriesActions = {
    getCategories: ()=> dispatch(getCategories() as any),
}