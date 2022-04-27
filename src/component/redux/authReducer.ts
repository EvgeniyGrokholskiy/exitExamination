import {createSlice, PayloadAction} from "@reduxjs/toolkit"

const clientId = "d98c4028-aa32-4106-9804-27f373e9f774"

interface IInitialState {
    [key: string]: string | boolean

    bearer: string
    isLogin: boolean
    firstName: string
    lastName: string
    email: string
    password: string
}

const initialState: IInitialState = {
    bearer: "",
    isLogin: false,
    firstName: "",
    lastName: "",
    email: "",
    password: ""
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState as IInitialState,
    reducers: {
        changeValue(state: IInitialState, action: PayloadAction<{ fieldName: string, value: string }>) {
            state[action.payload.fieldName] = action.payload.value
        },
        setIsLogin(state: IInitialState, action: PayloadAction<boolean>) {
            state.isLogin = action.payload
        }
    }
})

export const {changeValue, setIsLogin} = authSlice.actions
export default authSlice.reducer