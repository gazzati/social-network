import {instance, APIResponseType, ResultCodeEnum, ResultCodeForCaptchaEnum} from './'

type MeResponseDataType = {
    id: string
    name: string
    surname: string
    photo: string
}

export const authAPI = {
    me() {
        return instance.get<APIResponseType<MeResponseDataType>>(`auth/me`).then(res => res.data)
    },
    login(email: string, password: string) {
        return instance.post<APIResponseType<MeResponseDataType, ResultCodeEnum | ResultCodeForCaptchaEnum>>
        (`auth/login`, { email, password }).then(res => res.data)
    },
    registration(name: string, surname: string, email: string, password: string) {
        return instance.post<APIResponseType<MeResponseDataType, ResultCodeEnum | ResultCodeForCaptchaEnum>>
        (`auth/registration`, { name, surname, email, password }).then(res => res.data)
    },
    logout() {
        return instance.delete(`auth/logout`)
    }
}
