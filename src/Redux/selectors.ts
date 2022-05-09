import {RootState} from "./store"
import {
    ICaseState,
    IInitialAppState,
    IInitialAuthState,
    IInitialCasesState,
    INewOfficer,
    IOfficerState
} from "../types/types"


/************************AppSlice Selector***********************************/
export const getAppData = (state: RootState): IInitialAppState => state.app
export const getIsCaseEdit = (state: RootState): boolean => state.app.isCaseEdit
export const getIsShowLogin = (state: RootState): boolean => state.app.isShowLogin
export const getIsOfficerEdit = (state: RootState): boolean => state.app.isOfficerEdit

/**********************AuthSlice selector************************************/
export const getBearer = (state: RootState): string => state.auth.bearer
export const getAuthData = (state: RootState): IInitialAuthState => state.auth
export const getAuthIsLogin = (state: RootState): boolean => state.auth.isLogin
export const getLoggedInUserId = (state: RootState): string => state.auth.loginUser.id
export const getLoggedUserEmail = (state: RootState): string => state.auth.loginUser.email
export const getIsLoggedInUserApproved = (state: RootState): any => state.auth.loginUser.approved

/**********************CaseSlice selectors**********************************/
export const getCase = (state: RootState): IInitialCasesState => state.cases
export const getCaseFetchError = (state: RootState): string => state.cases.error
export const getIsCreated = (state: RootState): boolean => state.cases.isCreated
export const getEdinCase = (state: RootState): ICaseState => state.cases.editCase
export const getLoadingStatus = (state: RootState): boolean => state.cases.isLoading
export const getCasesArray = (state: RootState): Array<ICaseState> => state.cases.allCases

/*******************OfficersSlice selectors*******************************/
export const getOfficer = (state: RootState): INewOfficer => state.officers.oneOfficer
export const getOfficerFetchError = (state: RootState): string => state.officers.error
export const getOfficerIsLoading = (state: RootState): boolean => state.officers.isLoading
export const getNewOfficer = (state: RootState): IOfficerState => state.officers.newOfficer
export const getAllOfficers = (state: RootState): Array<IOfficerState> => state.officers.officersArray
export const getCreateNewOfficerError = (state: RootState): string => state.officers.createNewOfficerError
