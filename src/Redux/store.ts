import {appReducer} from "./appSlice"
import {combineReducers} from "redux"
import {authReducer} from "./authSlice"
import {casesReducer} from "./casesSlice"
import {configureStore} from "@reduxjs/toolkit"
import {officersReducer} from "./oficersSllice"


const RootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
    cases: casesReducer,
    officers: officersReducer
})

const store = configureStore({
    reducer: RootReducer
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store