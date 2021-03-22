import { APIResponseType, instance } from '.'
import { ProfileType } from '../types/types'

export const usersAPI = {
  getUsers(term = '') {
    return instance.get<APIResponseType<ProfileType[]>>(`users${term && `?term=${term}`}`).then((res) => res.data)
  },
  follow(id: string) {
    return instance.post<APIResponseType<ProfileType[]>>(`users/follow${id}`).then((res) => res.data)
  },
  unFollow(id: string) {
    return instance.delete(`users/unfollow${id}`).then((res) => res.data) as Promise<APIResponseType<ProfileType[]>>
  }
}
