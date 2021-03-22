import {instance, ResultCodeEnum} from '../api'
import {authAPI} from '../api/auth-api'
import {BaseThunkType, InferActionsTypes} from './'
import {LoginFormValuesType, RegistrationFormValuesType, UserDataType} from '../types/types'

const initialState = {
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
        case 'auth/SET_USER_PHOTO': {
            return {
                ...state,
                userData: {
                    ...state.userData,
                    photo: action.photo
                }
            }
        }
        case 'auth/TOGGLE_IS_FETCHING': {
            return { ...state, isFetching: action.isFetching }
        }
        default:
            return state
    }
}

export const authActions = {
    setAuthUserData: (userData: UserDataType, isAuth: boolean) =>
        ({ type: 'auth/SET_USER_DATA', payload: { userData, isAuth } } as const),
    setAuthPhoto: (photo: string) => ({ type: 'auth/SET_USER_PHOTO', photo } as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: 'auth/TOGGLE_IS_FETCHING', isFetching } as const)
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    dispatch(authActions.toggleIsFetching(true))
    const res = await authAPI.me()
    if (res.resultCode === ResultCodeEnum.Success) {
        dispatch(authActions.setAuthUserData(res.data, true))
    }
    dispatch(authActions.toggleIsFetching(false))
}

export const login = (data: LoginFormValuesType): ThunkType =>
    async (dispatch) => {
        dispatch(authActions.toggleIsFetching(true))
        const res = await authAPI.login(data)
        if (res.resultCode === ResultCodeEnum.Success) {
            instance.defaults.headers.authToken = res.data.authToken
            localStorage.setItem('authToken', res.data.authToken)
            dispatch(authActions.setAuthUserData(res.data.userData, true))
            dispatch(authActions.toggleIsFetching(false))
        }
    }

export const registration = (data: RegistrationFormValuesType): ThunkType =>
    async (dispatch) => {
        dispatch(authActions.toggleIsFetching(true))
        const res = await authAPI.registration(data)
        if (res.resultCode === ResultCodeEnum.Success) {
            instance.defaults.headers.authToken = res.data.authToken
            localStorage.setItem('authToken', res.data.authToken)
            dispatch(authActions.setAuthUserData(res.data.userData, true))
        }
        dispatch(authActions.toggleIsFetching(false))
    }

export const logout = (): ThunkType => async (dispatch) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        instance.defaults.headers.authToken = ''
        localStorage.removeItem('authToken')
        dispatch(authActions.setAuthUserData({ id: null, name: null, surname: null, photo: null }, false))
        window.location.reload()
    }
}

export default authReducer

type initialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof authActions>
type ThunkType = BaseThunkType<ActionsType>
