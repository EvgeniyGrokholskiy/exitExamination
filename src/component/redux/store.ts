import {appReducer} from "./appSlice"
import {combineReducers} from "redux"
import {authReducer} from "./authSlice"
import {casesReducer} from "./casesSlice"
import {configureStore} from "@reduxjs/toolkit"


const RootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
    cases: casesReducer
})

const store = configureStore({
    reducer: RootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store