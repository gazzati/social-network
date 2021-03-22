import { ProfileType } from '../types/types'
import { BaseThunkType, InferActionsTypes } from '.'
import { usersAPI } from '../api/users-api'

const initialState = {
  users: [] as Array<ProfileType>,
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [] as Array<number> // array of users ids
}

const usersReducer = (state = initialState, action: ActionsTypes): InitialState => {
  switch (action.type) {
    case 'users/SET_USERS': {
      return { ...state, users: action.data }
    }
    case 'users/SET_CURRENT_PAGE': {
      return { ...state, currentPage: action.currentPage }
    }
    case 'users/SET_TOTAL_USERS_COUNT': {
      return { ...state, totalUsersCount: action.count }
    }
    case 'users/TOGGLE_IS_FETCHING': {
      return { ...state, isFetching: action.isFetching }
    }
    case 'users/TOGGLE_IS_FOLLOWING_PROGRESS': {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId)
      }
    }
    case 'users/RESET_CURRENT_PAGE': {
      return { ...state, currentPage: 1 }
    }
    default:
      return state
  }
}

export const actions = {
  setUsers: (data: ProfileType[]) => ({ type: 'users/SET_USERS', data } as const),
  setCurrentPage: (currentPage: number) => ({ type: 'users/SET_CURRENT_PAGE', currentPage } as const),
  setTotalUsersCount: (totalUsersCount: number) =>
    ({
      type: 'users/SET_TOTAL_USERS_COUNT',
      count: totalUsersCount
    } as const),
  toggleIsFetching: (isFetching: boolean) => ({ type: 'users/TOGGLE_IS_FETCHING', isFetching } as const),
  toggleFollowingProgress: (isFetching: boolean, userId: number) =>
    ({
      type: 'users/TOGGLE_IS_FOLLOWING_PROGRESS',
      isFetching,
      userId
    } as const),
  resetCurrentPage: () => ({ type: 'users/RESET_CURRENT_PAGE' } as const)
}

/* export const requestUsers = (page: number, pageSize: number, term: string): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(actions.toggleIsFetching(true));   //???
        dispatch(actions.setCurrentPage(page))

        let data = await usersAPI.getUsers(page, pageSize, term)
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount))
    }
} */

// const _followUnfollowFlow =
// async (dispatch: Dispatch<ActionsTypes>, userId: string, apiMethod: any, actionCreator: (userId: string) => ActionsTypes) => {
//     //dispatch(actions.toggleFollowingProgress(true, userId))
//     let data = await apiMethod(userId)
//     if (data.resultCode === ResultCodeEnum.Success) {
//         dispatch(actionCreator(userId))
//     }
//     //dispatch(actions.toggleFollowingProgress(false, userId))
// }

// export const follow = (userId: string): ThunkType => {
//     return async (dispatch) => {
//         _followUnfollowFlow(dispatch, userId, usersAPI.Follow.bind(usersAPI), actions.followSuccess)
//     }
// }

// export const unfollow = (userId: string): ThunkType => {
//     return async (dispatch) => {
//         _followUnfollowFlow(dispatch, userId, usersAPI.unFollow.bind(usersAPI), actions.unfollowSuccess)
//     }
// }

export const requestUsers = (page: number, pageSize: number, term: string): ThunkType => async (dispatch) => {
  dispatch(actions.toggleIsFetching(true))
  dispatch(actions.setCurrentPage(page))

  const res = await usersAPI.getUsers(term)
  dispatch(actions.toggleIsFetching(false))
  dispatch(actions.setUsers(res.data))
  // dispatch(actions.setTotalUsersCount(data.totalCount))
}

export const follow = (userId: string): ThunkType => async (dispatch) => {
  dispatch(actions.toggleIsFetching(true))
  const res = await usersAPI.follow(userId)
  dispatch(actions.toggleIsFetching(false))
  dispatch(actions.setUsers(res.data))
}

export const unfollow = (userId: string): ThunkType => async (dispatch) => {
  dispatch(actions.toggleIsFetching(true))
  const res = await usersAPI.unFollow(userId)
  dispatch(actions.toggleIsFetching(false))
  dispatch(actions.setUsers(res.data))
}

export default usersReducer

type InitialState = typeof initialState
type ThunkType = BaseThunkType<ActionsTypes>
type ActionsTypes = InferActionsTypes<typeof actions>
