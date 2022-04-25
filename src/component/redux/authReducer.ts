import {createSlice, PayloadAction} from "@reduxjs/toolkit"

const clientId = "d98c4028-aa32-4106-9804-27f373e9f774"

interface IInitialState {
    firstName: string
    lastName: string
    email: string
    password: string
}

const initialState: IInitialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState as IInitialState,
    reducers: {
        changeValue: ((state: IInitialState, action:PayloadAction<{fieldName:string,value:string}>) => {
            // @ts-ignore
            state[action.payload.fieldName] = action.payload.value
        }),
        changePasswordValue: ((state: IInitialState, action:PayloadAction<string>) => {
            state.password = action.payload
        })
    }
})

export const {changeValue, changePasswordValue} = authSlice.actions
export default authSlice.reducer