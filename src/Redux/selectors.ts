import {RootState} from "./store"
import {ICaseState, IInitialAppState, IInitialAuthState, IInitialCasesState} from "../types/types"


/************************AppSlice Selector***********************************/
export const getAppData = (state: RootState): IInitialAppState => state.app
export const getIsCaseEdit = (state:RootState):boolean => state.app.isCaseEdit
export const getIsShowLogin = (state: RootState): boolean => state.app.isShowLogin
export const getIsOfficerEdit = (state: RootState): boolean => state.app.isOfficerEdit

/**********************AuthSlice selector************************************/
export const getBearer = (state: RootState): string => state.auth.bearer
export const getAuthData = (state: RootState): IInitialAuthState => state.auth
export const getAuthIsLogin = (state: RootState): boolean => state.auth.isLogin

/**********************CaseSlice selectors**********************************/
export const getCase = (state: RootState): IInitialCasesState => state.cases
export const getEdinCase = (state: RootState): ICaseState => state.cases.editCase
export const getLoadingStatus = (state: RootState): boolean => state.cases.isLoading
export const getCasesArray = (state: RootState): Array<ICaseState> => state.cases.allCases

/*******************OfficersSlice selectors*******************************/
export const getOfficer = (state: RootState) => state.officers.oneOfficer
export const getAllOfficers = (state: RootState) => state.officers.officersArray
export const getOfficerIsLoading = (state: RootState) => state.officers.isLoading
