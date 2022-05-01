import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./store";
import {casesApi} from "../../api/api";

export interface IInitialCasesState {
    [key: string]: string | boolean

    isLoading: boolean
    isCreated: boolean
    error: string
    status: string
    licenseNumber: string,
    ownerFullName: string,
    type: string,
    clientId: "d98c4028-aa32-4106-9804-27f373e9f774",
    color: string,
    date: string,
    officer: string,
    description: string
}

const initialState: IInitialCasesState = {
    isLoading: false,
    isCreated: false,
    error: "",
    status: "",
    licenseNumber: "",
    ownerFullName: "",
    type: "",
    clientId: "d98c4028-aa32-4106-9804-27f373e9f774",
    color: "",
    date: "",
    officer: "",
    description: ""
}

const casesSlice = createSlice({
    name: "cases",
    initialState: initialState as IInitialCasesState,
    reducers: {
        changeCaseValue(state: IInitialCasesState, action: PayloadAction<{ fieldName: string, value: string | boolean }>) {
            state[action.payload.fieldName] = action.payload.value
        },
        clearCaseForm(state: IInitialCasesState, action: PayloadAction<void>) {
            state.date = ""
            state.color = ""
            state.licenseNumber = ""
            state.ownerFullName = ""
            state.type = ""
            state.officer = ""
            state.description = ""
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createPublicCase.pending, (state, action: PayloadAction<void>) => {
            state.isLoading = true
            state.error = ""
            state.isCreated = false
        })
        builder.addCase(createPublicCase.fulfilled, (state: IInitialCasesState, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isCreated = true
        })
        builder.addCase(createPublicCase.rejected, (state: IInitialCasesState, action: PayloadAction<any>) => {
            state.isLoading = false
            state.error = action.payload.message
        })
    }
})

export const createPublicCase = createAsyncThunk<any, void, { state: RootState }>("cases/createPublicCase", (_, {
    dispatch,
    getState,
    rejectWithValue
}) => {
    const {licenseNumber, ownerFullName, type, clientId, color, date, description} = getState().cases
    return casesApi.createPublic(licenseNumber, ownerFullName, type, clientId, color, date, description)
        .then((response) => {
            return response.data
        })
        .catch((error) => rejectWithValue(error.response.data))

})

export const createAuthorisedCase = createAsyncThunk<any, void, { state: RootState }>("cases/createAuthorisedCase", (_, {
    dispatch,
    getState,
    rejectWithValue
}) => {
    const bearer = getState().auth.bearer
    const {licenseNumber, ownerFullName, type, color, date, description} = getState().cases
    return casesApi.createAuthorise(bearer, licenseNumber, ownerFullName, type, color, date, description)
        .then((response) => {
            return response.data
        })
        .catch((error) => rejectWithValue(error.response.data))

})
export const getCase = (state: RootState) => state.cases

export const {changeCaseValue, clearCaseForm} = casesSlice.actions
export const casesReducer = casesSlice.reducer