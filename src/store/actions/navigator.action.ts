import { AppThunk, dispatch } from '@store/index'
import { sliceActions } from '@slices/navigator.slice'
import Router from 'next/router'

// const navigateScreen = (): AppThunk => async (dispatch) => {
    
// }

const routerPush = (path: string): AppThunk => async (dispatch)  => {
    dispatch(sliceActions.loadingPage(true))
    Router.push(path)
}


export const navigatorActions = {
    // exampleThunk: ()=> dispatch(exampleThunk() as any),
    navigateScreen: (prams: {tabDefault: string, openTabDefault: string})=> dispatch(sliceActions.navigateSceen(prams)),
    routerPush: (path: string) => dispatch(routerPush(path) as any),
    loadingPage: (loading: boolean) => dispatch(sliceActions.loadingPage(loading)),
}