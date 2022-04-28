import {RootState} from "./store"
import {IInitialAppState} from "./appSlice"
import {IInitialAuthState} from "./authSlice"

/************************AppSlice Selector***********************************/
export const getAppData = (state: RootState): IInitialAppState => state.app

/**********************AuthSlice selector************************************/
export const getAuthData = (state: RootState): IInitialAuthState => state.auth