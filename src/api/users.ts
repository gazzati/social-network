import { APIResponseType, instance } from '.'
import { ProfileType } from '../types/types'

type GetUsersType = {
  total: number
  users: ProfileType[]
}

export type FollowUnfollow = {
  myId: string
  userId: string
}

export const usersApi = {
  getUsers(page: number, limit: number, term = '') {
    return instance
      .get<APIResponseType<GetUsersType>>(`users/?${term && `term=${term}&`}page=${page}&limit=${limit}`)
      .then((res) => res.data)
  },
  follow(id: string) {
    return instance.post<APIResponseType<FollowUnfollow>>(`users/follow${id}`).then((res) => res.data)
  },
  unFollow(id: string) {
    return instance.delete<APIResponseType<FollowUnfollow>>(`users/unfollow${id}`).then((res) => res.data)
  }
}
