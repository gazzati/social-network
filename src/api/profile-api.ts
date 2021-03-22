import { PostType, ProfileType } from '../types/types'
import { APIResponseType, instance } from '.'

type SavePhotoResponseDataType = {
  photo: string
}

type PostsType = {
  posts: PostType[]
}

type PostId = {
  postId: string
}

export const profileAPI = {
  getProfile(userId: string) {
    return instance.get<APIResponseType<ProfileType>>(`profile/${userId}`).then((res) => res.data.data)
  },
  updateStatus(status: string) {
    return instance
      .put<APIResponseType>('profile/status/', { status })
      .then((res) => res.data)
  },
  savePhoto(photoFile: File) {
    const formData = new FormData()
    formData.append('image', photoFile)
    return instance
      .put<APIResponseType<SavePhotoResponseDataType>>('profile/photo/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((res) => res.data)
  },
  saveProfile(profile: ProfileType) {
    return instance.put<APIResponseType<ProfileType>>('profile', profile).then((res) => res.data)
  },
  addPost(text: string) {
    return instance
      .post<APIResponseType<PostsType>>('profile/post', { postMessage: text })
      .then((res) => res.data)
  },
  addLike(postId: string) {
    return instance
      .put<APIResponseType<PostsType>>('profile/like', { postId })
      .then((res) => res.data)
  },
  deletePost(postId: string) {
    return instance.delete<APIResponseType<PostId>>(`profile/post${postId}`).then((res) => res.data)
  }
}
