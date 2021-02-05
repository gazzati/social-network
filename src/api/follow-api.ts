import {instance, APIResponseType} from './'
import {ProfileType} from '../types/types'

export const followApi = {
    getFollowing(currentPage = 1, pageSize = 10) {
        return instance.get<APIResponseType<ProfileType[]>>(`users/following`).then(res => res.data)
    },
    getFollowers(currentPage = 1, pageSize = 10) {
        return instance.get<APIResponseType<ProfileType[]>>(`users/followers`).then(res => res.data)
    }
}
