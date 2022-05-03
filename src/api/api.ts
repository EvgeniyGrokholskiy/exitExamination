import {ICaseState} from "../component/Redux/casesSlice"
import axios, {AxiosInstance, AxiosResponse} from "axios"
import {IOfficerState} from "../component/Redux/oficersSllice"

const instance: AxiosInstance = axios.create({
    baseURL: "https://sf-final-project.herokuapp.com/api/"
})

export const localStorageApi = {
    setValue<T>(fieldName: string, value: T) {
        localStorage.setItem(fieldName, String(value))
    },
    getValue(fieldName: string) {
        const getValue: string | null = localStorage.getItem(fieldName)
        return getValue && getValue
    }


}

export const authApi = {
    signUp(firstName: string, lastName: string, email: string, password: string) {
        return instance.post<AxiosResponse<{ status: string }>>("auth/sign_up", {
            firstName,
            lastName,
            email,
            password,
            clientId: process.env.CLIENT_ID,
        })
    },
    signIn(email: string, password: string) {
        return instance.post<AxiosResponse<any>>("auth/sign_in", {
            email,
            password,
            clientId: process.env.CLIENT_ID,
        })
    },
    tokenVerification(bearer:string){
        return instance.get<AxiosResponse<any>>("auth/",{headers: {Authorization: `Bearer ${bearer}`}})
    }
}

export const casesApi = {
    createPublic(licenseNumber: string, ownerFullName: string, type: string, clientId: string = "d98c4028-aa32-4106-9804-27f373e9f774", color: string, date: string, description: string) {
        return instance.post<AxiosResponse<any>>("public/report", {
            licenseNumber,
            ownerFullName,
            type,
            clientId,
            color,
            date,
            description,
        })
    },
    createAuthorise(bearer: string, licenseNumber: string, ownerFullName: string, type: string, color: string, date: string, description: string) {
        return instance.post<AxiosResponse<any>>("cases/", {
            licenseNumber,
            ownerFullName,
            type,
            color,
            date,
            description
        }, {headers: {Authorization: `Bearer ${bearer}`}})
    },
    editCase(bearer: string, id: string, editedCase: ICaseState) {
        return instance.put<AxiosResponse<any>>(`cases/${id}`, editedCase, {headers: {Authorization: `Bearer ${bearer}`}})
    },
    deleteCase(bearer: string, id: string) {
        return instance.delete(`/cases/${id}`, {headers: {Authorization: `Bearer ${bearer}`}})
    },
    getAllCases(bearer: string) {
        return instance.get("cases/", {headers: {Authorization: `Bearer ${bearer}`}})
    },
    getOneCase(bearer: string, id: string) {
        return instance.get(`cases/${id}`, {headers: {Authorization: `Bearer ${bearer}`}})
    }
}

export const officerApi = {
    getAllOfficers(bearer: string) {
        return instance.get<{ officers: Array<IOfficerState> }>("officers/", {headers: {Authorization: `Bearer ${bearer}`}})
    }
}