import {RootState} from "./store"
import {authApi} from "../api/api"
import {showLogin} from "./appSlice"
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {IInitialAuthState, ISignInProps, ISignUpProps, responseWithData, UserData} from "../types/types"


const initialState: IInitialAuthState = {
    bearer: "",
    isLogin: false,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    status: "idle",
    error: "",
    isNewUser: false,
    loginUser: {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        approved: false
    }
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState as IInitialAuthState,
    reducers: {
        changeAuthValue(state: IInitialAuthState, action: PayloadAction<{ fieldName: string, value: string | boolean | null }>) {
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
        builder.addCase(signUp.pending, (state: IInitialAuthState) => {
            state.status = "loading"
            state.error = ""
        })
        builder.addCase(signUp.fulfilled, (state: IInitialAuthState) => {
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

        builder.addCase(signIn.pending, (state: IInitialAuthState) => {
            state.status = "loading"
            state.error = ""
        })
        builder.addCase(signIn.fulfilled, (state: IInitialAuthState, action) => {
            state.email = ""
            state.password = ""
            state.isLogin = true
            state.status = "success"
            state.bearer = action.payload.data.token
            state.loginUser = action.payload.data.user
        })
        builder.addCase(signIn.rejected, (state: IInitialAuthState, action: PayloadAction<any>) => {
            state.status = "failed"
            state.isLogin = false
            state.error = action.payload.message
        })

        builder.addCase(tokenVerification.pending, (state: IInitialAuthState) => {
            state.status = "loading"
        })
        builder.addCase(tokenVerification.fulfilled, (state: IInitialAuthState, action) => {
            state.status = "success"
            state.bearer = action.payload.data?.token
            state.loginUser = action.payload.data.user
        })
        builder.addCase(tokenVerification.rejected, (state: IInitialAuthState, action: PayloadAction<any>) => {
            state.status = "failed"
            console.log(action.payload.message)
        })
    }
})


export const signUp = createAsyncThunk<responseWithData<void>, ISignUpProps, { state: RootState }>(
    "aunt/signUp",
    ({firstName, lastName, email, password}: ISignUpProps, {dispatch, rejectWithValue}) => {
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


export const signIn = createAsyncThunk<responseWithData<UserData>, ISignInProps, { state: RootState }>(
    "aunt/signIn",
    ({email, password}: ISignInProps, {rejectWithValue}) => {
        return authApi.signIn(email, password)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                return rejectWithValue(error.response.data)
            })
    }
)

export const tokenVerification = createAsyncThunk<responseWithData<UserData>, void, { state: RootState }>("auth/tokenVerification", (_, {
    getState,
    rejectWithValue
}) => {
    const bearer = getState().auth.bearer
    return authApi.tokenVerification(bearer).then((response) => {
        return response.data
    }).catch((error) => {
        return rejectWithValue(error.response.data)
    })
})


export const {changeAuthValue, setIsLogin, setNewUser} = authSlice.actions
export const authReducer = authSlice.reducer