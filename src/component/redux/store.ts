import {combineReducers} from "redux"
import authReducer from "./authSlice"
import appReducer from "./appSlice"
import {configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";

const middleware = [thunk];

const RootReducer = combineReducers({
    auth: authReducer,
    app: appReducer
})

const store = configureStore({
    reducer: RootReducer,
    middleware
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store