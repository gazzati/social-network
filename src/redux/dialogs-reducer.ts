import { BaseThunkType, InferActionsTypes } from '.'
import { dialogsAPI } from '../api/dialogs-api'
import { ChatsAndMessagesType, ChatType, MessageType } from '../types/types'

const initialState = {
  chats: [] as ChatType[],
  messages: [] as MessageType[] | 'no choose',
  newChatId: '' as string,
  isFetching: false
}

const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'dialogs/SET_DATA': {
      return {
        ...state,
        chats: action.data.chats,
        messages: action.data.messages,
        newChatId: action.data.newChatId || ''
      }
    }
    case 'dialogs/TOGGLE_IS_FETCHING': {
      return { ...state, isFetching: action.isFetching }
    }
    default:
      return state
  }
}

export const actions = {
  setData: (data: ChatsAndMessagesType) => ({ type: 'dialogs/SET_DATA', data } as const),
  toggleIsFetching: (isFetching: boolean) => ({ type: 'dialogs/TOGGLE_IS_FETCHING', isFetching } as const)
}

export const startChat = (userId: string): ThunkType<string> => async (dispatch) => {
  dispatch(actions.toggleIsFetching(true))
  const res = await dialogsAPI.startDialog(userId)
  dispatch(actions.setData(res.data))
  dispatch(actions.toggleIsFetching(false))
  return res.data.newChatId as string
}

export const getAllDialogs = (chatId: string): ThunkType => async (dispatch) => {
  dispatch(actions.toggleIsFetching(true))
  const res = await dialogsAPI.getAllDialogs(chatId)
  res.data?.chats && dispatch(actions.setData(res.data))
  dispatch(actions.toggleIsFetching(false))
}

export const sendMessage = (chatId: string, message: string): ThunkType => async (dispatch) => {
  dispatch(actions.toggleIsFetching(true))
  const res = await dialogsAPI.sendMessage(chatId, message)
  dispatch(actions.setData(res.data))
  dispatch(actions.toggleIsFetching(false))
}

export default dialogsReducer

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType<P = void> = BaseThunkType<ActionsTypes, Promise<P>>
