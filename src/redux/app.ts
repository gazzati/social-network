import { Dispatch } from 'redux'
import nextId from 'react-id-generator'

import { Notification } from 'src/types/types'
import { InferActionsTypes } from './index'

const initialState = {
  notifications: [] as Array<Notification>
}

const app = (state = initialState, action: ActionsType): initialStateType => {
  switch (action.type) {
    case 'app/ADD_NOTIFICATION': {
      return {
        ...state,
        notifications: [...state.notifications, action.notification]
      }
    }
    case 'app/REMOVE_NOTIFICATION': {
      return {
        ...state,
        notifications: state.notifications.filter((notification) => notification.id !== action.id)
      }
    }
    default:
      return state
  }
}

export const actions = {
  addNotification: (notification: Notification) => ({ type: 'app/ADD_NOTIFICATION', notification } as const),
  removeNotification: (id: string) => ({ type: 'app/REMOVE_NOTIFICATION', id } as const)
}

export const addNotification = (type: 'error' | 'success' | 'info', message: string) => (dispatch: Dispatch) => {
  const id = nextId()
  const messageLiveTime = 5000

  dispatch(actions.addNotification({ id, type, message }))

  setTimeout(() => {
    return dispatch(actions.removeNotification(id))
  }, messageLiveTime)
}

export const removeNotification = (id: string) => (dispatch: Dispatch) => {
  dispatch(actions.removeNotification(id))
}

export default app

type initialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
