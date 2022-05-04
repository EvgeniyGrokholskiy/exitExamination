import {RootState} from "./store"
import {setOfficerEditMode} from "./appSlice"
import {localStorageApi, officerApi} from "../api/api"
import {IInitialOfficersState, IOfficerState} from "../types/types"
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"


const initialOfficersState: IInitialOfficersState = {
    isLoading: false,
    error: "",
    newOfficer: {
        _id: "",
        email: "",
        firstName: null,
        lastName: null,
        clientId: "",
        approved: false
    },
    oneOfficer: {
        _id: "",
        email: "",
        firstName: null,
        lastName: null,
        clientId: "",
        approved: false
    },
    officersArray: []
}

export const officersSlice = createSlice({
    name: "officers",
    initialState: initialOfficersState as IInitialOfficersState,
    reducers: {
        changeOfficersValue(state: IInitialOfficersState, action: PayloadAction<{ fieldName: string, value: string | boolean | null }>) {
            state[action.payload.fieldName] = action.payload.value
        },
        changeOneOfficerValue(state: IInitialOfficersState, action: PayloadAction<{ fieldName: string, value: string | boolean | null }>) {
            state.oneOfficer[action.payload.fieldName] = action.payload.value
        }
    },
    extraReducers: (builder => {
        builder.addCase(createOfficer.pending, (state: IInitialOfficersState, action: PayloadAction<void>) => {
            state.error = ""
            state.isLoading = true
        })
        builder.addCase(createOfficer.fulfilled, (state: IInitialOfficersState, action: PayloadAction<any>) => {
            state.isLoading = false
        })
        builder.addCase(createOfficer.rejected, (state:IInitialOfficersState, action:PayloadAction<any>)=>{
            state.isLoading = false
            state.error = action.payload.message
        })
        builder.addCase(updateOfficer.pending, (state: IInitialOfficersState, action: PayloadAction<void>) => {
            state.error = ""
            state.isLoading = true
        })
        builder.addCase(updateOfficer.fulfilled, (state: IInitialOfficersState, action: PayloadAction<any>) => {
            state.isLoading = false
        })
        builder.addCase(updateOfficer.rejected, (state: IInitialOfficersState, action: PayloadAction<any>) => {
            state.isLoading = false
            state.error = action.payload.message
        })
        builder.addCase(deleteOfficer.pending, (state: IInitialOfficersState, action: PayloadAction<void>) => {
            state.error = ""
            state.isLoading = true
        })
        builder.addCase(deleteOfficer.fulfilled, (state: IInitialOfficersState, action: PayloadAction<void>) => {
            state.isLoading = false
        })
        builder.addCase(deleteOfficer.rejected, (state: IInitialOfficersState, action: PayloadAction<any>) => {
            state.isLoading = false
            state.error = action.payload.message
        })
        builder.addCase(getAllOfficersArray.pending, (state: IInitialOfficersState) => {
            state.error = ""
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
        builder.addCase(getOneOfficer.pending, (state: IInitialOfficersState) => {
            state.error = ""
            state.isLoading = true
        })
        builder.addCase(getOneOfficer.fulfilled, (state: IInitialOfficersState, action: PayloadAction<any>) => {
            state.isLoading = false
            state.oneOfficer._id = action.payload.data._id
            state.oneOfficer.email = action.payload.data.email
            state.oneOfficer.firstName = action.payload.data.firstName
            state.oneOfficer.lastName = action.payload.data.lastName
            state.oneOfficer.clientId = action.payload.data.clientId
            state.oneOfficer.approved = action.payload.data.approved
        })
        builder.addCase(getOneOfficer.rejected, (state: IInitialOfficersState, action: PayloadAction<any>) => {
            state.isLoading = false
            state.error = action.payload.message
        })
    })
})

export const createOfficer = createAsyncThunk<any, IOfficerState, { state: RootState }>("officer/createOfficer", (officer: IOfficerState, {
    dispatch,
    getState,
    rejectWithValue
}) => {
    const newOfficer = getState().officers.newOfficer
    const bearer = localStorageApi.getBearer()
    return bearer && officerApi.createOfficer(bearer, newOfficer)
        .then((response) => response.data)
        .catch((error) => rejectWithValue(error.response.data))
})

export const updateOfficer = createAsyncThunk<any, string, { state: RootState }>("officers/updateOfficer", (
    id
    , {
        dispatch,
        getState,
        rejectWithValue
    }) => {
    const bearer = localStorageApi.getBearer()
    const officer = getState().officers.oneOfficer
    return bearer && officerApi.editOfficer(bearer, id, officer)
        .then((response) => {
            dispatch(setOfficerEditMode(false))
            dispatch(getAllOfficersArray())
            return response.data
        })
        .catch((error) => rejectWithValue(error.response.data))
})


export const deleteOfficer = createAsyncThunk<any, string, { state: RootState }>("officers/deleteOfficer", (id, {
    dispatch,
    getState,
    rejectWithValue
}) => {
    const bearer = localStorageApi.getBearer()
    return bearer && officerApi.deleteOfficer(bearer, id)
        .then((response) => {
            dispatch(getAllOfficersArray())
            return response.data
        })
        .catch((error) => rejectWithValue(error.response.data))

})

export const getAllOfficersArray = createAsyncThunk<any, void, { state: RootState }>("officers/getAllOfficers", (_, {
    rejectWithValue
}) => {
    const bearer = localStorageApi.getBearer()
    return bearer && officerApi.getAllOfficers(bearer)
        .then((response) => response.data)
        .catch((error) => rejectWithValue(error.response.data))
})

export const getOneOfficer = createAsyncThunk<any, string, { state: RootState }>("officers/getOneOfficer", (id, {rejectWithValue}) => {
    const bearer = localStorageApi.getBearer()
    return bearer && officerApi.getOneOfficer(bearer, id)
        .then((response) => response.data)
        .catch((error) => rejectWithValue(error.response.data))
})


export const {changeOfficersValue, changeOneOfficerValue} = officersSlice.actions
export const officersReducer = officersSlice.reducer