import {createSlice, PayloadAction} from "@reduxjs/toolkit"

export interface IInitialAppState {
    [key: string]: string | boolean

    isCaseEdit: boolean
    isOfficerEdit: boolean
    isShowLogin: boolean
}

const initialState: IInitialAppState = {
    isCaseEdit: false,
    isOfficerEdit: false,
    isShowLogin: true
}

const appSlice = createSlice({
    name: "app",
    initialState: initialState as IInitialAppState,
    reducers: {
        showLogin(state: IInitialAppState, action: PayloadAction<boolean>) {
            state.isShowLogin = action.payload
        },
        setCaseEditMode(state: IInitialAppState, action: PayloadAction<boolean>) {
            state.isCaseEdit = action.payload
        },
        setOfficerEditMode(state: IInitialAppState, action: PayloadAction<boolean>) {
            state.isOfficerEdit = action.payload
        }
    }
})

export const appReducer = appSlice.reducer
export const {showLogin, setCaseEditMode, setOfficerEditMode} = appSlice.actions