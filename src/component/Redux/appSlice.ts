import {createSlice, PayloadAction} from "@reduxjs/toolkit"

export interface IInitialAppState {
    [key: string]: string | boolean

    isEdit: boolean
    isShowLogin: boolean
}

const initialState: IInitialAppState = {
    isEdit: false,
    isShowLogin: true
}

const appSlice = createSlice({
    name: "app",
    initialState: initialState as IInitialAppState,
    reducers: {
        showLogin(state: IInitialAppState, action: PayloadAction<boolean>) {
            state.isShowLogin = action.payload
        },
        setEditMode(state: IInitialAppState, action: PayloadAction<boolean>) {
            state.isEdit = action.payload
        },
    }
})

export const appReducer = appSlice.reducer
export const {showLogin, setEditMode} = appSlice.actions