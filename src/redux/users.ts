import update from 'immutability-helper'

import { ProfileType } from 'src/types/types'
import { usersAPI, FollowUnfollow } from 'src/api/users-api'
import { BaseThunkType, InferActionsTypes } from '.'

const initialState = {
  users: [] as Array<ProfileType>,
  currentPage: 1,
  pageSize: 7,
  totalUsersCount: 0,
  isFetching: true,
  followingInProgress: [] as Array<string>
}

const users = (state = initialState, action: ActionsTypes): InitialState => {
  switch (action.type) {
    case 'users/SET_USERS': {
      return { ...state, users: action.data }
    }

    case 'users/UPDATE_USERS': {
      const { myId, userId } = action.payload
      const user = state.users.filter((user) => user._id === userId)[0]

      const userIndex = state.users.indexOf(user)

      if (user.followers.includes(myId)) {
        const myIndex = user.followers.indexOf(myId)

        return update(state, {
          users: {
            [userIndex]: {
              followers: { $splice: [[myIndex, 1]] }
            }
          }
        })
      }

      return update(state, {
        users: {
          [userIndex]: {
            followers: { $push: [myId] }
          }
        }
      })
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
  updateUsers: (payload: FollowUnfollow) => ({ type: 'users/UPDATE_USERS', payload } as const),
  setCurrentPage: (currentPage: number) => ({ type: 'users/SET_CURRENT_PAGE', currentPage } as const),
  setTotalUsersCount: (totalUsersCount: number) =>
    ({
      type: 'users/SET_TOTAL_USERS_COUNT',
      count: totalUsersCount
    } as const),
  toggleIsFetching: (isFetching: boolean) => ({ type: 'users/TOGGLE_IS_FETCHING', isFetching } as const),
  toggleFollowingProgress: (isFetching: boolean, userId: string) =>
    ({
      type: 'users/TOGGLE_IS_FOLLOWING_PROGRESS',
      isFetching,
      userId
    } as const),
  resetCurrentPage: () => ({ type: 'users/RESET_CURRENT_PAGE' } as const)
}

export const requestUsers = (page: number, term: string): ThunkType => async (dispatch) => {
  dispatch(actions.toggleIsFetching(true))
  dispatch(actions.setCurrentPage(page))

  const res = await usersAPI.getUsers(page, initialState.pageSize, term)
  dispatch(actions.setUsers(res.data.users))
  dispatch(actions.setTotalUsersCount(res.data.total))
  dispatch(actions.toggleIsFetching(false))
}

export const follow = (userId: string): ThunkType => async (dispatch) => {
  dispatch(actions.toggleIsFetching(true))
  dispatch(actions.toggleFollowingProgress(true, userId))

  const res = await usersAPI.follow(userId)
  dispatch(actions.updateUsers(res.data))
  dispatch(actions.toggleIsFetching(false))
  dispatch(actions.toggleFollowingProgress(false, userId))
}

export const unfollow = (userId: string): ThunkType => async (dispatch) => {
  dispatch(actions.toggleIsFetching(true))
  dispatch(actions.toggleFollowingProgress(true, userId))

  const res = await usersAPI.unFollow(userId)
  dispatch(actions.updateUsers(res.data))
  dispatch(actions.toggleIsFetching(false))
  dispatch(actions.toggleFollowingProgress(false, userId))
}

export const resetCurrentPage = (): ThunkType => async (dispatch) => {
  dispatch(actions.resetCurrentPage())
}

type InitialState = typeof initialState
type ThunkType = BaseThunkType<ActionsTypes>
type ActionsTypes = InferActionsTypes<typeof actions>

export default users
