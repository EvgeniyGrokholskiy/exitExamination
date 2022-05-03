import {RootState} from "./store"
import {IInitialAppState} from "./appSlice"
import {IInitialAuthState} from "./authSlice"

/************************AppSlice Selector***********************************/
export const getAppData = (state: RootState): IInitialAppState => state.app

/**********************AuthSlice selector************************************/
export const getAuthData = (state: RootState): IInitialAuthState => state.auth

/**********************CaseSlice selectors**********************************/
export const getCase = (state: RootState) => state.cases
export const getIsEdit = (state: RootState) => state.cases.isEdit
export const getOneCaseItem = (state: RootState) => state.cases.oneCase
export const getCasesArray = (state: RootState) => state.cases.allCases
export const getLoadingStatus = (state: RootState) => state.cases.isLoading