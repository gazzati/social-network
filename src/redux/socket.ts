import { Dispatch } from 'redux'
import io from 'socket.io-client'

import { ChatType, MessageType } from 'src/types/types'
import { actions } from './dialogs'
import { addNotification } from './app'

let socket: any = null

export const connect = () => async (dispatch: Dispatch) => {
  socket = io('https://gazzati-social-network-socket.herokuapp.com', {
  // socket = io('http://localhost:8001', {
    auth: {
      token: localStorage.getItem('authToken')
    }
  })
  socket.connect()

  socket.on('chats', (chats: ChatType[]) => {
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

export const disconnect = () => async () => {
  socket?.disconnect()
}

export const sendMessage = (chatId: string, messageText: string) => async (dispatch: Dispatch) => {
  dispatch(actions.toggleIsFetching(true))

  socket?.emit('sendMessage', { chatId, messageText }, (err: any) => {
    if (err) addNotification('error', err)
  })
}

export const getChatsData = (chatId?: string) => async (dispatch: Dispatch) => {
  dispatch(actions.toggleIsFetching(true))

  socket?.emit('loadData', { chatId }, (err: any) => {
    if (err) addNotification('error', err)
  })
}

export const startChat = (userId: string) => async (dispatch: Dispatch) => {
  dispatch(actions.toggleIsFetching(true))

  socket?.connect()
  socket?.emit('startChat', { companionId: userId }, (err: any) => {
    if (err) addNotification('error', err)
  })
}
