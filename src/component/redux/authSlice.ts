import {auth} from "../../api/api"
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {showLogin} from "./appSlice";

const clientId = "d98c4028-aa32-4106-9804-27f373e9f774"

export interface IInitialAuthState {
    [key: string]: string | boolean

    bearer: string
    isLogin: boolean
    firstName: string
    lastName: string
    email: string
    password: string
    status: "idle" | "loading" | "success" | "failed"
    error: string
    isNewUser: boolean
}

const initialState: IInitialAuthState = {
    bearer: "",
    isLogin: false,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    status: "idle",
    error: "",
    isNewUser: false
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState as IInitialAuthState,
    reducers: {
        changeValue(state: IInitialAuthState, action: PayloadAction<{ fieldName: string, value: string }>) {
            state[action.payload.fieldName] = action.payload.value
        },
        setIsLogin(state: IInitialAuthState, action: PayloadAction<boolean>) {
            state.isLogin = action.payload
        },
        setNewUser(state: IInitialAuthState, action: PayloadAction<boolean>) {
            state.isNewUser = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signUp.pending, (state: IInitialAuthState, action: PayloadAction<void>) => {
            state.error = ""
            state.email = ""
            state.password = ""
        })
        builder.addCase(signUp.fulfilled, (state: IInitialAuthState, action: PayloadAction<any>) => {
            state.isNewUser = true
            state.status = "success"

        })
        builder.addCase(signUp.rejected, (state: IInitialAuthState, action: PayloadAction<any>) => {
            state.isLogin = false
            state.status = "failed"
            state.isNewUser = false

            state.error = action.payload.message
        })
        builder.addCase(signIn.pending, (state: IInitialAuthState, action: PayloadAction<void>) => {
            state.error = ""
            state.email = ""
            state.password = ""
        })
        builder.addCase(signIn.fulfilled, (state: IInitialAuthState, action: PayloadAction<any>) => {
            state.isLogin = true
            state.status = "success"
            state.bearer = action.payload.data.data.token
        })
        builder.addCase(signIn.rejected, (state: IInitialAuthState, action: PayloadAction<any>) => {
            state.isLogin = false
            state.error = action.payload.message
        })
    }
})

interface ISignUpProps {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export const signUp = createAsyncThunk(
    "aunt/signUp",
    ({firstName, lastName, email, password}: ISignUpProps, {dispatch, getState, rejectWithValue}) => {
        const response = auth.signUp(firstName, lastName, email, password)
        return response
            .then((data) => {
                dispatch(showLogin(true))
                return data.data
            })
            .catch((error) => {
                dispatch(showLogin(false))
                return rejectWithValue(error.response.data)
            })
    }
)

interface ISignInProps {
    email: string,
    password: string
}

export const signIn = createAsyncThunk(
    "aunt/signIn",
    ({email, password}: ISignInProps, {dispatch, getState, rejectWithValue}) => {
        const response = auth.signIn(email, password)
        return response
            .then((response) => {
                return response
            })
            .catch((error) => {
                rejectWithValue(error.response.data)
            })
    }
)

export const {changeValue, setIsLogin, setNewUser} = authSlice.actions
export default authSlice.reducer