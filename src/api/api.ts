import axios, {AxiosInstance, AxiosResponse} from "axios"

const clientId: string = "d98c4028-aa32-4106-9804-27f373e9f774"

const instance: AxiosInstance = axios.create({
    baseURL: "https://sf-final-project.herokuapp.com/api/",
    headers: {
        "Authorization": "Bearer <token>"
    },
})

interface ISignInResponse {

}

export const authApi = {
    signUp(firstName: string, lastName: string, email: string, password: string) {
        return instance.post<AxiosResponse<{ status: string }>>("auth/sign_up", {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            clientId: "d98c4028-aa32-4106-9804-27f373e9f774",
        })
    },
    signIn(email: string, password: string) {
        return instance.post<AxiosResponse<any>>("auth/sign_in", {
            email: email,
            password: password,
            clientId: "d98c4028-aa32-4106-9804-27f373e9f774",
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
    }
}