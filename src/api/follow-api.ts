import { APIResponseType, instance } from '.'
import { ProfileType } from '../types/types'

export const followApi = {
  getFollowing() {
    return instance.get<APIResponseType<ProfileType[]>>('users/following').then((res) => res.data)
  },
  getFollowers() {
    return instance.get<APIResponseType<ProfileType[]>>('users/followers').then((res) => res.data)
  }
}
