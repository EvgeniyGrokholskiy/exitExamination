import { combineReducers} from "redux"
import authReducer from "./authReducer"
import {configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";

const middleware = [thunk];

const RootReducer = combineReducers({
    auth: authReducer
})

const store = configureStore({
    reducer: RootReducer,
    middleware
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store