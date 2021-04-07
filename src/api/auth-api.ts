import { APIResponseType, instance } from '.'
import { LoginFormValuesType, RegistrationFormValuesType } from '../types/types'

type MeResponseDataType = {
  id: string
  name: string
  surname: string
  photo: string
  isMale: boolean
}

type LoginRegistrationResponseDataType = {
  userData: MeResponseDataType
  authToken: string
}

export const authAPI = {
  me() {
    return instance.get<APIResponseType<MeResponseDataType>>('auth/me').then((res) => res.data)
  },
  login(data: LoginFormValuesType) {
    return instance.post<APIResponseType<LoginRegistrationResponseDataType>>('auth/login', data).then((res) => res.data)
  },
  registration(data: RegistrationFormValuesType) {
    return instance
      .post<APIResponseType<LoginRegistrationResponseDataType>>('auth/registration', data)
      .then((res) => res.data)
  },
  logout() {
    return instance.delete<APIResponseType>('auth/logout').then((res) => res.data)
  }
}
