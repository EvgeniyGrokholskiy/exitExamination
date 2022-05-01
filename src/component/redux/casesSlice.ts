import {RootState} from "./store"
import {casesApi} from "../../api/api"
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"

export interface ICaseState {
    [key: string]: string | boolean

    _id: string
    status: string
    licenseNumber: string
    type: "general" | "sport"
    ownerFullName: string
    clientId: "d98c4028-aa32-4106-9804-27f373e9f774"
    createdAt: string
    updateAt: string
    color: string
    date: string
    officer: string
    description: string
    resolution: string
}

export interface IInitialCasesState {
    [key: string]: string | boolean | Array<ICaseState> | ICaseState

    isLoading: boolean
    isCreated: boolean
    isEdit: boolean
    error: string
    status: string
    licenseNumber: string,
    ownerFullName: string
    type: "general" | "sport",
    clientId: "d98c4028-aa32-4106-9804-27f373e9f774"
    color: string
    date: string
    officer: string
    description: string
    oneCase: ICaseState | ""
    allCases: Array<ICaseState>,
    editCase: ICaseState
}

const initialState: IInitialCasesState = {
    isLoading: false,
    isCreated: false,
    isEdit: false,
    error: "",
    status: "",
    licenseNumber: "",
    ownerFullName: "",
    type: "general",
    clientId: "d98c4028-aa32-4106-9804-27f373e9f774",
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
        clientId: "d98c4028-aa32-4106-9804-27f373e9f774",
        createdAt: "",
        updateAt: "",
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
        changeCaseValue(state: IInitialCasesState, action: PayloadAction<{ fieldName: string, value: string | boolean }>) {
            state[action.payload.fieldName] = action.payload.value
        },
        clearCaseForm(state: IInitialCasesState, action: PayloadAction<void>) {
            state.date = ""
            state.color = ""
            state.licenseNumber = ""
            state.ownerFullName = ""
            state.type = "general"
            state.officer = ""
            state.description = ""
        },
        setEditMode(state: IInitialCasesState, action: PayloadAction<boolean>) {
            state.isEdit = action.payload
        },
        setCaseToEdit(state: IInitialCasesState, action: PayloadAction<ICaseState>) {
            state.editCase = action.payload
        },
        changeEditCaseValue(state: IInitialCasesState, action: PayloadAction<{ fieldName: string, value: string | boolean }>) {
            state.editCase[action.payload.fieldName] = action.payload.value
        },
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
        builder.addCase(createAuthorisedCase.pending, (state: IInitialCasesState, action: PayloadAction<void>) => {
            state.isLoading = true
            state.error = ""
            state.isCreated = false
        })
        builder.addCase(createAuthorisedCase.fulfilled, (state: IInitialCasesState, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isCreated = true
        })
        builder.addCase(createAuthorisedCase.rejected, (state: IInitialCasesState, action: PayloadAction<any>) => {
            state.isLoading = false
            state.error = action.payload.message
        })
        builder.addCase(getAllCases.pending, (state: IInitialCasesState, action: PayloadAction<any>) => {
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
        builder.addCase(getOneCase.fulfilled, (state: IInitialCasesState, action: PayloadAction<any>) => {
            state.isLoading = false
        })
        builder.addCase(getOneCase.rejected, (state: IInitialCasesState, action: PayloadAction<any>) => {
            state.error = action.payload.message
        })
        builder.addCase(deleteCase.pending, (state: IInitialCasesState, action: PayloadAction<any>) => {
            state.isLoading = true
        })
        builder.addCase(deleteCase.fulfilled, (state: IInitialCasesState, action: PayloadAction<any>) => {
            state.isLoading = false
        })
        builder.addCase(deleteCase.rejected, (state: IInitialCasesState, action: PayloadAction<any>) => {
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
        .then((response) => response.data)
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
        .then((response) => response.data)
        .catch((error) => rejectWithValue(error.response.data))

})

export const getAllCases = createAsyncThunk<any, void, { state: RootState }>("cases/getAllCases", (_, {
    dispatch,
    getState,
    rejectWithValue
}) => {
    const bearer = localStorage.getItem("bearer")
    return bearer && casesApi.getAllCases(bearer)
        .then((response) => response.data)
        .catch((error) => rejectWithValue(error.response.data))
})

export const getOneCase = createAsyncThunk<any, string, { state: RootState }>("cases/getOneCase", (id, {
    dispatch,
    getState,
    rejectWithValue
}) => {
    const bearer = localStorage.getItem("bearer")
    return bearer && casesApi.getOneCase(bearer, id)
        .then((response) => response.data)
        .catch((error) => rejectWithValue(error.response.data))
})

export const deleteCase = createAsyncThunk<any, string, { state: RootState }>("cases/deleteCase", (id, {
    dispatch,
    getState,
    rejectWithValue
}) => {
    const bearer = localStorage.getItem("bearer")
    return bearer && casesApi.deleteCase(bearer, id)
        .then((response) => response.data)
        .then(() => dispatch(getAllCases()))
        .catch((error) => rejectWithValue(error.response.data))
})

export const getCase = (state: RootState) => state.cases
export const getIsEdit = (state: RootState) => state.cases.isEdit
export const getOneCaseItem = (state: RootState) => state.cases.oneCase
export const getCasesArray = (state: RootState) => state.cases.allCases
export const getLoadingStatus = (state: RootState) => state.cases.isLoading

export const {changeCaseValue, clearCaseForm, setEditMode, setCaseToEdit, changeEditCaseValue} = casesSlice.actions
export const casesReducer = casesSlice.reducer