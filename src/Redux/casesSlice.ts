import {RootState} from "./store"
import {casesApi} from "../api/api"
import {setCaseEditMode} from "./appSlice"
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {ICaseState, IInitialCasesState, responseWithData} from "../types/types"


const CLIENT_ID = process.env.CLIENT_ID

const initialState: IInitialCasesState = {
    isLoading: false,
    isCreated: false,
    error: "",
    status: "",
    licenseNumber: "",
    ownerFullName: "",
    type: "general",
    clientId: CLIENT_ID,
    color: "",
    date: "",
    officer: "",
    description: "",
    oneCase: "",
    allCases: [],
    editCase: {
        _id: "",
        status: "",
        licenseNumber: "",
        type: "general",
        ownerFullName: "",
        clientId: CLIENT_ID,
        createdAt: "",
        updatedAt: "",
        color: "",
        date: "",
        officer: "",
        description: "",
        resolution: ""
    }
}

const casesSlice = createSlice({
    name: "cases",
    initialState: initialState as IInitialCasesState,
    reducers: {
        changeCaseValue(state: IInitialCasesState, action: PayloadAction<{ fieldName: string, value: string | boolean | null }>) {
            state[action.payload.fieldName] = action.payload.value
        },
        clearCaseForm(state: IInitialCasesState) {
            state.date = ""
            state.color = ""
            state.licenseNumber = ""
            state.ownerFullName = ""
            state.type = "general"
            state.officer = ""
            state.description = ""
        },
        setCaseToEdit(state: IInitialCasesState, action: PayloadAction<ICaseState>) {
            state.editCase = action.payload
        },
        changeEditCaseValue(state: IInitialCasesState, action: PayloadAction<{ fieldName: string, value: string | boolean | null }>) {
            state.editCase[action.payload.fieldName] = action.payload.value
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createPublicCase.pending, (state) => {
            state.isLoading = true
            state.error = ""
            state.isCreated = false
        })
        builder.addCase(createPublicCase.fulfilled, (state: IInitialCasesState) => {
            state.isLoading = false
            state.isCreated = true
        })
        builder.addCase(createPublicCase.rejected, (state: IInitialCasesState, action: PayloadAction<any>) => {
            state.isLoading = false
            state.error = action.payload.message
        })
        builder.addCase(createAuthorisedCase.pending, (state: IInitialCasesState) => {
            state.isLoading = true
            state.error = ""
            state.isCreated = false
        })
        builder.addCase(createAuthorisedCase.fulfilled, (state: IInitialCasesState) => {
            state.isLoading = false
            state.isCreated = true
        })
        builder.addCase(createAuthorisedCase.rejected, (state: IInitialCasesState, action: PayloadAction<any>) => {
            state.isLoading = false
            state.error = action.payload.message
        })
        builder.addCase(getAllCases.pending, (state: IInitialCasesState) => {
            state.isLoading = true
            state.error = ""
        })
        builder.addCase(getAllCases.fulfilled, (state: IInitialCasesState, action: PayloadAction<any>) => {
            state.isLoading = false
            state.allCases = action.payload.data

        })
        builder.addCase(getAllCases.rejected, (state: IInitialCasesState, action: PayloadAction<any>) => {
            state.error = action.payload.message
        })
        builder.addCase(getOneCase.pending, (state: IInitialCasesState, action: PayloadAction<any>) => {
            state.isLoading = true
            state.oneCase = action.payload.data
        })
        builder.addCase(getOneCase.fulfilled, (state: IInitialCasesState) => {
            state.isLoading = false
        })
        builder.addCase(getOneCase.rejected, (state: IInitialCasesState, action: PayloadAction<any>) => {
            state.error = action.payload.message
        })
        builder.addCase(deleteCase.pending, (state: IInitialCasesState) => {
            state.isLoading = true
        })
        builder.addCase(deleteCase.fulfilled, (state: IInitialCasesState) => {
            state.isLoading = false
        })
        builder.addCase(deleteCase.rejected, (state: IInitialCasesState, action: PayloadAction<any>) => {
            state.error = action.payload.message
        })
    }
})

export const createPublicCase = createAsyncThunk<responseWithData<ICaseState>, void, { state: RootState }>("cases/createPublicCase", (_, {
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

export const createAuthorisedCase = createAsyncThunk<responseWithData<ICaseState>, void, { state: RootState }>("cases/createAuthorisedCase", (_, {
    getState,
    rejectWithValue
}) => {
    const bearer = getState().auth.bearer
    const {licenseNumber, ownerFullName, type, color, date, description} = getState().cases
    return casesApi.createAuthorise(bearer, licenseNumber, ownerFullName, type, color, date, description)
        .then((response) => response.data)
        .catch((error) => rejectWithValue(error.response.data))

})

export const getAllCases = createAsyncThunk<any, string, { state: RootState }>("cases/getAllCases", (id, {
    dispatch,
    rejectWithValue
}) => {
    const bearer = localStorage.getItem("bearer")
    return bearer && casesApi.getAllCases(bearer)
        .then((response) => {
            if (id) {
                const report = response.data.data.filter((item: ICaseState) => item._id === id)
                dispatch(setCaseToEdit(report[0]))
            }
            return response.data
        })
        .catch((error) => rejectWithValue(error.response.data))
})
//не работает санка!!!!! как и почему не понятно!!!!! при вызове сразу перекидывает в getOneCase.reject, при этом не происходит запрос
export const getOneCase = createAsyncThunk<responseWithData<ICaseState>, string, { state: RootState }>("cases/getOneCase", (id, {
    getState,
    rejectWithValue
}) => {
    const bearer = getState().auth.bearer
    return casesApi.getOneCase(bearer, id)
        .then((response) => response.data)
        .catch((error) => rejectWithValue(error.response.data))
})

export const deleteCase = createAsyncThunk<any, string, { state: RootState }>("cases/deleteCase", (id, {
    dispatch,
    getState,
    rejectWithValue
}) => {
    const bearer = getState().auth.bearer
    return casesApi.deleteCase(bearer, id)
        .then((response) => response.data)
        .then(() => dispatch(getAllCases('')))
        .catch((error) => rejectWithValue(error.response.data))
})

export const saveEditedCase = createAsyncThunk<responseWithData<ICaseState>, string, { state: RootState }>("cases/saveEditedCase", (id, {
    dispatch,
    getState,
    rejectWithValue
}) => {
    const editedCase = getState().cases.editCase
    const bearer = getState().auth.bearer
    return casesApi.editCase(bearer, id, editedCase)
        .then((response) => {
            dispatch(setCaseEditMode(false))
            return response.data
        })
        .catch((error) => rejectWithValue(error.response.data))
})



export const {changeCaseValue, clearCaseForm, setCaseToEdit, changeEditCaseValue} = casesSlice.actions
export const casesReducer = casesSlice.reducer