import {instance, APIResponseType} from './'

type MeResponseDataType = {
    id: string
    name: string
    surname: string
    photo: string
}

type LoginRegistrationResponseDataType = {
    userData: MeResponseDataType
    authToken: string
}

export const authAPI = {
    me() {
        return instance.get<APIResponseType<MeResponseDataType>>(`auth/me`).then(res => res.data)
    },
    login(email: string, password: string) {
        return instance.post<APIResponseType<LoginRegistrationResponseDataType>>
        (`auth/login`, { email, password }).then(res => res.data)
    },
    registration(name: string, surname: string, email: string, password: string) {
        return instance.post<APIResponseType<LoginRegistrationResponseDataType>>
        (`auth/registration`, { name, surname, email, password }).then(res => res.data)
    },
    logout() {
        return instance.delete(`auth/logout`)
    }
}
