import React from "react";
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";

/**Api types and interfaces**/

export interface UserData {
    token: string
    user: IUserFromAuth
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

export interface IUserFromAuth {
    id: string
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
    clientId: string | undefined
}

export interface ISignInProps {
    email: string,
    password: string
}

export interface IInitialAuthState {
    [key: string]: string | boolean | null | IUserFromAuth | undefined

    bearer: string
    clientId: string | undefined
    isLogin: boolean
    firstName: string
    lastName: string
    email: string
    password: string
    status: "idle" | "loading" | "success" | "failed"
    error: string
    isNewUser: boolean
    loginUser: IUserFromAuth
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
    resolution: string
    oneCase: ICaseState | ""
    allCases: Array<ICaseState>,
    editCase: ICaseState
}

/**OfficerSlice types and interfaces**/

export interface IOfficerState {
    [key: string]: string | boolean | null

    _id: string
    email: string
    password: string
    firstName: string | null
    lastName: string | null
    clientId: string
    approved: boolean
}

export interface INewOfficer {
    [key: string]: string | boolean | null

    _id: string
    email: string
    firstName: string | null
    lastName: string | null
    clientId: string
    approved: boolean
}

export interface IInitialOfficersState {
    [key: string]: string | boolean | null | Array<IOfficerState> | IOfficerState | INewOfficer

    isLoading: boolean
    error: string
    newOfficer: IOfficerState
    oneOfficer: INewOfficer
    officersArray: Array<IOfficerState>
}

export class RejectWithValue<T, U> {
}

/****Component props****/

export interface IReportsCardProps {
    oneCase: ICaseState
    isLoggedUserApproved: boolean
    handleLinkToDetails: () => void
    handleDeleteCase: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export interface IReportInProps {
    report: ICaseState
}

export interface IOfficerItemProps {
    officer: IOfficerState
    loggedInUserId: string
    isLoggedInUserApproved: boolean
}

interface IFormCommonProps {
    label: string
    name: string
    required: boolean
    action?: ActionCreatorWithPayload<{ fieldName: string, value: string | boolean | null }, string>
    callback?: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => void
}

export interface IFormTextareaProps extends IFormCommonProps {
    value: string | boolean | ICaseState | ICaseState[] | null | undefined
}

export interface IFormOfficersListProps extends IFormCommonProps {
    value: string
}

export interface IFormInputProps extends IFormCommonProps {
    type: string
    checked?: boolean
    value?: string | null
}

export interface IFormSelectProps extends IFormCommonProps {
    value: string
}

export interface IFormStateSelect extends IFormCommonProps {
    value: string
}

export interface IMyButtonsCommonProps {
    children?: React.ReactNode
}

export interface IMyButtonProps extends IMyButtonsCommonProps {
    callback?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export interface IMyNavLinkProps extends IMyButtonsCommonProps {
    link: string
    callback?: (event: React.MouseEvent<HTMLAnchorElement>) => void
}

export interface IListItemProps {
    label: string
    value: string | boolean | null
}

export interface ISendMessageModalProps {
    action: ActionCreatorWithPayload<{ fieldName: string, value: string | boolean | null }>
}

