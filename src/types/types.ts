import React from "react";

/**Api types and interfaces**/

export interface UserData {
    token: string
    user: IUser
}

export interface responseWithData<T> {
    status: string
    data: T
}

export interface responseWithOfficersArray {
    officers: Array<IOfficerState>
}

/**App types and interface**/

export interface IInitialAppState {
    [key: string]: string | boolean

    isCaseEdit: boolean
    isOfficerEdit: boolean
    isShowLogin: boolean
}

/**AuthSlice types and interfaces**/

export interface IUser {
    _id: string
    firstName: string
    lastName: string
    email: string
    password: string
    approved: boolean
}

export interface ISignUpProps {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export interface ISignInProps {
    email: string,
    password: string
}

export interface IInitialAuthState {
    [key: string]: string | boolean | null | IUser

    bearer: string
    isLogin: boolean
    firstName: string
    lastName: string
    email: string
    password: string
    status: "idle" | "loading" | "success" | "failed"
    error: string
    isNewUser: boolean
    loginUser: IUser
}

/**CasesSlice types and interfaces**/

export interface ICaseState {
    [key: string]: string | boolean | null | undefined

    _id: string
    status: string
    licenseNumber: string
    type: "general" | "sport"
    ownerFullName: string
    clientId: string | undefined
    createdAt: string | null
    updatedAt: string | null
    color: string
    date: string
    officer: string
    description: string
    resolution: string
}

export interface IInitialCasesState {
    [key: string]: string | boolean | Array<ICaseState> | ICaseState | null | undefined

    isLoading: boolean
    isCreated: boolean
    error: string
    status: string
    licenseNumber: string,
    ownerFullName: string
    type: "general" | "sport",
    clientId: string | undefined
    color: string
    date: string
    officer: string
    description: string
    oneCase: ICaseState | ""
    allCases: Array<ICaseState>,
    editCase: ICaseState
}

/**OfficerSlice types and interfaces**/

export interface IOfficerState {
    [key: string]: string | boolean | null

    _id: string
    email: string
    firstName: string | null
    lastName: string | null
    clientId: string
    approved: boolean
}

export interface IInitialOfficersState {
    [key: string]: string | boolean | null | Array<IOfficerState> | IOfficerState

    isLoading: boolean
    error: string
    newOfficer: IOfficerState
    oneOfficer: IOfficerState
    officersArray: Array<IOfficerState>
}

/****Component props****/

export interface IReportsCardProps {
    status: string
    licenseNumber: string
    ownerFullName: string
    type: string
    createdAt: string | null
    updatedAt: string | null
    color: string
    date: string
    officer: string
    description: string
    resolution: string
    handleLinkToDetails: () => void
    handleDeleteCase: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export interface IReportInProps {
    report: ICaseState
}

export interface IOfficerInProps {
    officer: IOfficerState
}

