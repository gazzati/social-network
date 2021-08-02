import { APIResponseType, instance } from '.'
import { LoginFormValuesType, RegistrationFormValuesType, RegistrationSubmitData } from '../types/types'

type MeResponseDataType = {
  id: string
  name: string
  surname: string
  photo: string
  isMale: boolean
}

export type LoginRegistrationResponseDataType = {
  userData: MeResponseDataType
  authToken: string
}

export const authApi = {
  me() {
    return instance.get<APIResponseType<MeResponseDataType>>('auth/me').then((res) => res.data)
  },
  login(data: LoginFormValuesType) {
    return instance.post<APIResponseType<LoginRegistrationResponseDataType>>('auth/login', data).then((res) => res.data)
  },
  registration(data: RegistrationFormValuesType) {
    return instance
      .post<APIResponseType<{id: string}>>('auth/registration', data)
      .then((res) => res.data)
  },
  registrationSubmit(data: RegistrationSubmitData) {
    return instance
      .post<APIResponseType<LoginRegistrationResponseDataType>>('auth/registration/submit', data)
      .then((res) => res.data)
  },
  logout() {
    return instance.delete<APIResponseType>('auth/logout').then((res) => res.data)
  }
}
