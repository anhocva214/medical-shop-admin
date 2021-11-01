import {
    AppstoreFilled,
    CodeSandboxCircleFilled,
    TagsFilled
} from '@ant-design/icons';
import {ReactNode, createElement} from 'react'

interface IChildren{
    title: string;
    path: string;
}

interface IRoutes{
    subMenu: boolean;
    title: string;
    path?: string;
    icon: ReactNode;
    children?: IChildren[]
}

export const pathList = {
    login: "/login",
    dashboard: "/admin/dashboard",
    product: "/admin/product",
    productAdd: "/admin/product/add",
    categories: "/admin/categories",
    categoriesAdd: "/admin/categories/add",


}

export const routesSidebar: IRoutes[] = [
    {
        subMenu: false,
        title: "dashboard",
        path: pathList.dashboard,
        icon: createElement(AppstoreFilled)
    },
    {
        subMenu: false,
        title: "product",
        icon: createElement(CodeSandboxCircleFilled),
        path: pathList.product,
    },
    {
        subMenu: false,
        title: "categories",
        icon: createElement(TagsFilled),
        path: pathList.categories
    }
]