import { AppThunk, dispatch } from '@store/index'
import { sliceActions } from '@slices/user.slice'
import * as UserApis from '@apis/user.api'
import { User } from 'src/models/response/user.model'
import {Cookies} from 'react-cookie'
const cookie = new Cookies()
import {message} from 'antd'


// const getUsers = (): AppThunk => async (dispatch) => {
//     let users : User[] = await UserApis.test();
//     // console.log(users)
//     dispatch(sliceActions.getUsers(users))
// }


export const login = (data: {username: string; password: string}): AppThunk => async (dispatch) => {
    try{
        dispatch(sliceActions.loadingLogin())
        let res = await UserApis.login(data);
        dispatch(sliceActions.loginSuccess(res.data))
        cookie.set('access_token', res.token.access_token, {
            maxAge: res.token.expiresIn,
        })
    }
    catch(err){
        dispatch(sliceActions.loginFailure())
        message.error(err?.message)
    }
}