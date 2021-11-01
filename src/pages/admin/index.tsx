import { navigatorActions } from "@actions/navigator.action";
import { pathList } from "@utils/routes";
import {useEffect} from 'react'


export default function AdminPage(){
    useEffect(() => {
        navigatorActions.routerPush(pathList.dashboard)
    }, [])
    return (
        <>
        </>
    )
}