import { AppThunk, dispatch } from '@store/index'
import { sliceActions } from '@slices/navigator.slice'


// const navigateScreen = (): AppThunk => async (dispatch) => {
    
// }


export const navigatorActions = {
    // exampleThunk: ()=> dispatch(exampleThunk() as any),
    navigateScreen: (prams: {tabDefault: string, openTabDefault: string})=> dispatch(sliceActions.navigateSceen(prams))
}