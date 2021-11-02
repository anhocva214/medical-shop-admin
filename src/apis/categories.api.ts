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

const remove = async (id: string) => {
    return BaseAxios({
        url: urls.categoriesDelete,
        method: 'POST',
        data: {
            id
        }
    })
}

const update = (category: Categories) => {
    return BaseAxios({
        url: urls.categoriesUpdate,
        method: 'POST',
        data: category
    })
}

export const categoriesApis = {
    getList,
    create,
    remove,
    update
}