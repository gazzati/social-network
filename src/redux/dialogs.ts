import { ChatType, MessageType } from 'src/types/types'
import { Dispatch } from 'redux'
import { InferActionsTypes } from '.'

const initialState = {
  chats: [] as ChatType[],
  messages: [] as MessageType[] | 'no choose',
  newChatId: '' as string,
  isFetching: false
}

const dialogs = (state = initialState, action: ActionsTypes): InitialStateType => {
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

export default dialogs

export const resetNewChatId = () => async (dispatch: Dispatch) => {
  dispatch(actions.setNewChatId(''))
}

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
