import {ResultCodeEnum} from '../api'
import {authAPI} from '../api/auth-api'
import {BaseThunkType, InferActionsTypes} from './'
import {UserDataType} from '../types/types'

let initialState = {
    userData: {
        id: null,
        name: null,
        surname: null,
        photo: null
    } as UserDataType,
    isAuth: false,
    isFetching: false as boolean
}

const authReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'auth/SET_USER_DATA': {
            return {
                ...state,
                ...action.payload
            }
        }
        case 'auth/TOGGLE_IS_FETCHING': {
            return { ...state, isFetching: action.isFetching }
        }
        default:
            return state
    }
}

export const actions = {
    setAuthUserData: (userData: UserDataType, isAuth: boolean) =>
        ({ type: 'auth/SET_USER_DATA', payload: { userData, isAuth } } as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: 'auth/TOGGLE_IS_FETCHING', isFetching } as const)
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    dispatch(actions.toggleIsFetching(true))
    let res = await authAPI.me()
    if (res.resultCode === ResultCodeEnum.Error) {
        dispatch(actions.toggleIsFetching(false))
    }
    if (res.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setAuthUserData(res.data, true))
        dispatch(actions.toggleIsFetching(false))
    }
}

export const login = (email: string, password: string): ThunkType =>
    async (dispatch: any) => {
        dispatch(actions.toggleIsFetching(true))
        let res = await authAPI.login(email, password)
        if (res.resultCode === ResultCodeEnum.Success) {
            localStorage.setItem('authToken', res.data.authToken)
            dispatch(actions.setAuthUserData(res.data.userData, true))
            dispatch(actions.toggleIsFetching(false))
        }
    }

export const registration = (name: string, surname: string, email: string, password: string): ThunkType =>
    async (dispatch: any) => {
        dispatch(actions.toggleIsFetching(true))
        let res = await authAPI.registration(name, surname, email, password)
        if (res.resultCode === ResultCodeEnum.Success) {
            localStorage.setItem('authToken', res.data.authToken)
            dispatch(actions.setAuthUserData(res.data.userData, true))
        }
        dispatch(actions.toggleIsFetching(false))
    }

export const logout = (): ThunkType => async (dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        localStorage.removeItem('authToken')
        dispatch(actions.setAuthUserData({ id: null, name: null, surname: null, photo: null }, false))
    }
}

export default authReducer

type initialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>
