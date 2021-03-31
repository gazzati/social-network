import io from 'socket.io-client'

import { BaseThunkType, InferActionsTypes } from '.'
import { ChatType, MessageType } from '../types/types'

const socket = io('http://localhost:4001', {
  auth: {
    token: localStorage.getItem('authToken')
  }
})

const initialState = {
  chats: [] as ChatType[],
  messages: [] as MessageType[] | 'no choose',
  newChatId: '' as string,
  isFetching: false
}

const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'dialogs/SET_CHATS': {
      return {
        ...state,
        chats: action.chats
      }
    }
    case 'dialogs/SET_MESSAGES': {
      return {
        ...state,
        messages: action.messages
      }
    }
    case 'dialogs/SET_NEW_CHAT_ID': {
      return {
        ...state,
        newChatId: action.newChatId
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
  setChats: (chats: ChatType[]) => ({ type: 'dialogs/SET_CHATS', chats } as const),
  setMessages: (messages: MessageType[]) => ({ type: 'dialogs/SET_MESSAGES', messages } as const),
  setNewChatId: (newChatId: string) => ({ type: 'dialogs/SET_NEW_CHAT_ID', newChatId } as const),
  toggleIsFetching: (isFetching: boolean) => ({ type: 'dialogs/TOGGLE_IS_FETCHING', isFetching } as const)
}

export default dialogsReducer

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>

export const connect = (): ThunkType => async (dispatch) => {
  socket.connect()

  socket.on('chats', (chats: ChatType[]) => {
    console.log(chats)
    dispatch(actions.setChats(chats))
    dispatch(actions.toggleIsFetching(false))
  })

  socket.on('messages', (messages: MessageType[]) => {
    dispatch(actions.setMessages(messages))
    dispatch(actions.toggleIsFetching(false))
  })

  socket.on('newChatId', (newChatId: string) => {
    dispatch(actions.setNewChatId(newChatId))
    dispatch(actions.toggleIsFetching(false))
  })
}

export const disconnect = (): ThunkType => async () => {
  socket.disconnect()
}

export const sendMessage = (chatId: string, messageText: string): ThunkType => async (dispatch) => {
  dispatch(actions.toggleIsFetching(true))
  socket.emit('sendMessage', { chatId, messageText }, (err: any) => {
    if (err) console.log(err)
  })
}

export const getChatsData = (chatId?: string): ThunkType => async (dispatch) => {
  dispatch(actions.toggleIsFetching(true))

  socket.emit('loadData', { chatId }, (err: any) => {
    if (err) console.log(err)
  })
}

export const startChat = (userId: string): ThunkType => async (dispatch) => {
  dispatch(actions.toggleIsFetching(true))

  socket.emit('startChat', { companionId: userId }, (err: any) => {
    if (err) console.log(err)
  })
}
