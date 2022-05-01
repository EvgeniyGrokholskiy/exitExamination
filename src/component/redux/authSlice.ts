import {RootState} from "./store"
import {showLogin} from "./appSlice"
import {authApi} from "../../api/api"
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"

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
        changeAuthValue(state: IInitialAuthState, action: PayloadAction<{ fieldName: string, value: string | boolean }>) {
            state[action.payload.fieldName] = action.payload.value
            state.error = ""
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
            state.status = "loading"
            state.error = ""
        })
        builder.addCase(signUp.fulfilled, (state: IInitialAuthState, action: PayloadAction<any>) => {
            state.email = ""
            state.password = ""
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
            state.status = "loading"
            state.error = ""
        })
        builder.addCase(signIn.fulfilled, (state: IInitialAuthState, action: PayloadAction<any>) => {
            state.email = ""
            state.password = ""
            state.isLogin = true
            state.status = "success"
            state.bearer = action.payload.data.token
        })
        builder.addCase(signIn.rejected, (state: IInitialAuthState, action: PayloadAction<any>) => {
            state.status = "failed"
            state.isLogin = false
            state.error = action.payload.message
        })
        builder.addCase(tokenVerification.pending, (state: IInitialAuthState, action: PayloadAction<any>) => {
            state.status = "loading"
        })
        builder.addCase(tokenVerification.fulfilled, (state: IInitialAuthState, action: PayloadAction<any>) => {
            state.status = "success"
            state.bearer = action.payload.data?.token
        })
        builder.addCase(tokenVerification.rejected, (state: IInitialAuthState, action: PayloadAction<any>) => {
            state.status = "failed"
            console.log(action.payload.message)
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
        return authApi.signUp(firstName, lastName, email, password)
            .then((response) => {
                dispatch(showLogin(true))
                return response.data
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
        return authApi.signIn(email, password)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                return rejectWithValue(error.response.data)
            })
    }
)

export const tokenVerification = createAsyncThunk<any, void, { state: RootState }>("auth/tokenVerification", (_, {
    dispatch,
    getState,
    rejectWithValue
}) => {
    const bearer = getState().auth.bearer
    return authApi.tokenVerification(bearer).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    })
})

export const {changeAuthValue, setIsLogin, setNewUser} = authSlice.actions
export const authReducer = authSlice.reducer