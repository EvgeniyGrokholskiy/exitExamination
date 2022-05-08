import axios, {AxiosInstance} from "axios"
import {ICaseState, IOfficerState, responseWithData, responseWithOfficersArray, UserData} from "../types/types"

const instance: AxiosInstance = axios.create({
    baseURL: "https://sf-final-project.herokuapp.com/api/"
})

const clientId = process.env.CLIENT_ID

type gotValueFromLS = string | null

export const localStorageApi = {
    setBearer(value: string) {
        localStorage.setItem("bearer", value)
    },
    getBearer(): gotValueFromLS {
        return localStorage.getItem("bearer")
    },
    setIsLogin(value: boolean): void {
        localStorage.setItem("isLogin", String(value))
    },
    getIsLogin(): gotValueFromLS {
        return localStorage.getItem("isLogin")
    }
}

export const authApi = {
    signUp(firstName: string, lastName: string, email: string, password: string) {
        return instance.post<responseWithData<void>>("auth/sign_up", {
            firstName,
            lastName,
            email,
            password,
            clientId: clientId,
        })
    },
    signIn(email: string, password: string) {
        return instance.post<responseWithData<UserData>>("auth/sign_in", {
            email,
            password,
            clientId: clientId,
        })
    },
    tokenVerification(bearer:string){
        return instance.get<responseWithData<UserData>>("auth/", {headers: {Authorization: `Bearer ${bearer}`}})
    }
}

export const casesApi = {
    createPublic(licenseNumber: string, ownerFullName: string, type: string, clientId: string = "d98c4028-aa32-4106-9804-27f373e9f774", color: string, date: string, description: string) {
        return instance.post<responseWithData<ICaseState>>("public/report", {
            licenseNumber,
            ownerFullName,
            type,
            clientId,
            color,
            date,
            description,
        })
    },
    createAuthorise(bearer: string, licenseNumber: string, ownerFullName: string, type: string, color: string, officer: string, date: string, description: string, resolution: string) {
        return instance.post<responseWithData<ICaseState>>("cases/", {
            licenseNumber,
            ownerFullName,
            type,
            color,
            officer,
            date,
            description,
            resolution
        }, {headers: {Authorization: `Bearer ${bearer}`}})
    },
    editCase(bearer: string, id: string, editedCase: ICaseState) {
        return instance.put<responseWithData<ICaseState>>(`cases/${id}`, editedCase, {headers: {Authorization: `Bearer ${bearer}`}})
    },
    deleteCase(bearer: string, id: string) {
        return instance.delete<responseWithData<void>>(`cases/${id}`, {headers: {Authorization: `Bearer ${bearer}`}})
    },
    getAllCases(bearer: string) {
        return instance.get<responseWithData<Array<ICaseState>>>("cases/", {headers: {Authorization: `Bearer ${bearer}`}})
    },
    getOneCase(bearer: string, id: string) {
        return instance.get<responseWithData<ICaseState>>(`cases/${id}`, {headers: {Authorization: `Bearer ${bearer}`}})
    }
}

export const officerApi = {
    createOfficer(bearer: string, newOfficer:IOfficerState){
        return instance.post<responseWithData<IOfficerState>>("officers", newOfficer, {headers: {Authorization: `Bearer ${bearer}`}})
    },
    editOfficer(bearer: string, id: string, officer: IOfficerState) {
        return instance.put<responseWithData<IOfficerState>>(`officers/${id}`, officer, {headers: {Authorization: `Bearer ${bearer}`}})
    },
    deleteOfficer(bearer: string, id: string) {
        return instance.delete<responseWithData<void>>(`officers/${id}`,{headers: {Authorization: `Bearer ${bearer}`}})
    },
    getAllOfficers(bearer: string) {
        return instance.get<responseWithOfficersArray>("officers/", {headers: {Authorization: `Bearer ${bearer}`}})
    },
    getOneOfficer(bearer: string, id: string) {
        return instance.get<responseWithData<IOfficerState>>(`officers/${id}`, {headers: {Authorization: `Bearer ${bearer}`}})
    },

}