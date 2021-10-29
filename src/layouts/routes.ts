import {
    AppstoreOutlined,
    CodeSandboxOutlined
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

export const routes: IRoutes[] = [
    {
        subMenu: false,
        title: "dashboard",
        path: "/admin/dashboard",
        icon: createElement(AppstoreOutlined)
    },
    {
        subMenu: true,
        title: "product",
        icon: createElement(CodeSandboxOutlined),
        children: [
            {
                title: "list",
                path: "/admin/user/list"
            },
            {
                title: "add",
                path: "/admin/product/add"
            },
            
        ]
    }
]