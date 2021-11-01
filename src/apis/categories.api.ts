import BaseAxios from '@services/api'
import { User } from 'src/models/response/user.model'
import * as urls from './urls'
import { Categories } from 'src/models/categories'

const getList = async () => {
    return BaseAxios({
        url: urls.categoriesList,
        method: 'GET'
    })
}

const create = async (categories: Categories) => {
    return BaseAxios({
        url: urls.categoriesCreate,
        method: "POST",
        data: categories,
    })
}

export const categoriesApis = {
    getList,
    create
}