import { Action, applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunkMiddleware, { ThunkAction } from 'redux-thunk'

import app from './app'
import profile from './profile'
import dialogs from './dialogs'
import users from './users'
import auth from './auth'
import news from './news'
import settings from './settings'
import follow from './follow'

const rootReducer = combineReducers({ app, profile, dialogs, users, auth, news, settings, follow })

type RootReducerType = typeof rootReducer // (globalstate: StateType) => AppStateType
export type StateType = ReturnType<RootReducerType>

export type InferActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, StateType, unknown, A>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))
// @ts-ignore
window.__store__ = store

export default store
