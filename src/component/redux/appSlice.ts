import {createSlice, PayloadAction} from "@reduxjs/toolkit"

export interface IInitialAppState {
    [key: string]: string | boolean

    isShowLogin: boolean
}

const initialState: IInitialAppState = {
    isShowLogin: true
}

const appSlice = createSlice({
    name: "app",
    initialState: initialState as IInitialAppState,
    reducers: {
        showLogin(state: IInitialAppState, action: PayloadAction<boolean>) {
            state.isShowLogin = action.payload
        }
    }
})

export default appSlice.reducer
export const {showLogin} = appSlice.actions