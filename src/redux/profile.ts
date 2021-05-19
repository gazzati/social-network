import { PostType, ProfileInfoType, ProfileType } from 'src/types/types'
import { profileApi } from 'src/api/profile'
import { addNotification } from './app'
import { authActions } from './auth'
import { BaseThunkType, InferActionsTypes } from '.'

const initialState = {
  profile: {
    _id: 'emty',
    info: {
      name: '',
      surname: '',
      contacts: {}
    },
    status: '',
    posts: []
  } as ProfileType,
  isFetching: true
}

const profile = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'profile/SET_STATUS': {
      return {
        ...state,
        profile: {
          ...state.profile,
          status: action.status
        }
      }
    }
    case 'profile/SET_USER_PROFILE': {
      return { ...state, profile: action.profile }
    }
    case 'profile/SAVE_PHOTO_SUCCESS': {
      return {
        ...state,
        profile: { ...state.profile, photo: { ...state.profile.photo, url: action.photo } } as ProfileType
      }
    }
    case 'profile/REFRESH_POSTS': {
      return {
        ...state,
        profile: {
          ...state.profile,
          posts: action.posts
        }
      }
    }
    case 'profile/DELETE_POST': {
      return {
        ...state,
        profile: {
          ...state.profile,
          posts: state.profile.posts.filter((post) => post._id !== action.postId)
        }
      }
    }
    case 'profile/TOGGLE_IS_FETCHING': {
      return { ...state, isFetching: action.isFetching }
    }
    default:
      return state
  }
}

export const actions = {
  setUserProfile: (profile: ProfileType) => ({ type: 'profile/SET_USER_PROFILE', profile } as const),
  setStatus: (status: string) => ({ type: 'profile/SET_STATUS', status } as const),
  savePhotoSuccess: (photo: string) => ({ type: 'profile/SAVE_PHOTO_SUCCESS', photo } as const),
  refreshPostsActionCreator: (posts: PostType[]) => ({ type: 'profile/REFRESH_POSTS', posts } as const),
  deletePostActionCreator: (postId: string) => ({ type: 'profile/DELETE_POST', postId } as const),
  toggleIsFetching: (isFetching: boolean) => ({ type: 'profile/TOGGLE_IS_FETCHING', isFetching } as const)
}

export const getUserProfile = (userId: string): ThunkType => async (dispatch) => {
  dispatch(actions.toggleIsFetching(true))
  const data = await profileApi.getProfile(userId)
  dispatch(actions.setUserProfile(data))
  dispatch(actions.toggleIsFetching(false))
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
  const data = await profileApi.updateStatus(status)
  if (data.resultCode === 0) {
    dispatch(actions.setStatus(status))
  }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
  dispatch(actions.toggleIsFetching(true))
  const data = await profileApi.savePhoto(file)
  dispatch(actions.savePhotoSuccess(data.data.photo))
  // @ts-ignore //TODO
  dispatch(authActions.setAuthPhoto(data.data.photo))
  dispatch(actions.toggleIsFetching(false))
}

export const saveProfile = (profile: ProfileInfoType): ThunkType => async (dispatch) => {
  dispatch(actions.toggleIsFetching(true))
  const res = await profileApi.saveProfile(profile)
  if (res.resultCode === 0) {
    dispatch(actions.setUserProfile(res.data))
    dispatch(addNotification('success', res.message))
  } else {
    dispatch(addNotification('error', res.message))
  }
  dispatch(actions.toggleIsFetching(false))
}

export const addPost = (text: string): ThunkType => async (dispatch) => {
  const res = await profileApi.addPost(text)
  dispatch(actions.refreshPostsActionCreator(res.data.posts))
}

export const addLikes = (postId: string, userId: string): ThunkType => async (dispatch) => {
  const res = await profileApi.addLike(postId, userId)
  dispatch(actions.refreshPostsActionCreator(res.data.posts))
}

export const deletePost = (postId: string): ThunkType => async (dispatch) => {
  const res = await profileApi.deletePost(postId)
  dispatch(actions.deletePostActionCreator(res.data.postId))
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

export default profile
