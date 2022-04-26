import axios from "axios"

const clientId = "d98c4028-aa32-4106-9804-27f373e9f774"

const instance = axios.create({
    baseURL: "https://sf-final-project.herokuapp.com/api/",
    headers: {
        "Authorization": "Bearer <token>"
    },
})

export const auth = {
    signUp: (firstName: string, lastName: string, email: string, password: string) => {
        return instance.post<{ status: string }>("auth/sign_up", {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            clientId: "d98c4028-aa32-4106-9804-27f373e9f774",
        })
    },
    signIn: (email: string, password: string)=>{
        return instance.post("auth/sign_in",{
            email: email,
            password: password,
            clientId: "d98c4028-aa32-4106-9804-27f373e9f774",
        })
    }
}