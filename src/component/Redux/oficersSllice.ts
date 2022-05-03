import {RootState} from "./store"
import {officerApi} from "../../api/api"
import {changeEditCaseValue} from "./casesSlice"
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"

export interface IOfficerState {
    [key: string]: string | boolean | null

    _id: string
    email: string
    firstName: string | null
    lastName: string | null
    password: string
    clientId: string
    approved: boolean
}

export interface IInitialOfficersState {
    [key: string]: string | boolean | null | Array<IOfficerState>

    isLoading: boolean
    error: string
    _id: string
    email: string
    firstName: string | null
    lastName: string | null
    password: string
    clientId: string
    approved: boolean
    officersArray: Array<IOfficerState>
}

const initialOfficersState: IInitialOfficersState = {
    isLoading: false,
    error: "",
    _id: "",
    email: "",
    firstName: null,
    lastName: null,
    password: "",
    clientId: "",
    approved: false,
    officersArray: []
}

export const officersSlice = createSlice({
    name: "officers",
    initialState: initialOfficersState as IInitialOfficersState,
    reducers: {
        changeOfficersValue(state: IInitialOfficersState, action: PayloadAction<{ fieldName: string, value: string }>) {
            state[action.payload.fieldName] = action.payload.value
        }
    },
    extraReducers: (builder => {
        builder.addCase(getAllOfficersArray.pending, (state: IInitialOfficersState, action: PayloadAction<void>) => {
            state.isLoading = true
        })
        builder.addCase(getAllOfficersArray.fulfilled, (state: IInitialOfficersState, action: PayloadAction<any>) => {
            state.isLoading = false
            state.officersArray = action.payload.officers
        })
        builder.addCase(getAllOfficersArray.rejected, (state: IInitialOfficersState, action: PayloadAction<any>) => {
            state.isLoading = false
            state.error = action.payload.message
        })
    })
})

export const getAllOfficersArray = createAsyncThunk<any, void, { state: RootState }>("officers/getAllOfficers", (_, {
    dispatch,
    getState,
    rejectWithValue
}) => {
    const bearer = localStorage.getItem("bearer")
    return bearer && officerApi.getAllOfficers(bearer)
        .then((response) => {
            return response.data
        })
        .catch((error) => rejectWithValue(error.response.data))
})


export const {changeOfficersValue} = officersSlice.actions
export const officersReducer = officersSlice.reducer