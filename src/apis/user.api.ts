import BaseAxios from '@services/api'
import { User } from 'src/models/response/user.model'
import * as urls from './urls'

export const login = async (
    data:{
        username: string,
        password: string
    }
) => {
    return BaseAxios({
        url: urls.login,
        method: 'POST',
        data
    })
}