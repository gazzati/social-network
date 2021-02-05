import {instance, APIResponseType} from './'
import {ChatsAndMessagesType} from '../types/types'

export const dialogsAPI = {
    getAllDialogs(chatId: string) {
        return instance.get<APIResponseType<ChatsAndMessagesType>>(`chats/${chatId}`).then(res => res.data)
    },
    startDialog(userId: string) {
        return instance.put<APIResponseType<ChatsAndMessagesType & {newChatId: string}>>(`chats/start/${userId}`).then(res => res.data)
    },
    sendMessage(chatId: string, text: string) {
        return instance.post<APIResponseType<ChatsAndMessagesType>>(`chats/send${chatId}`, { text }).then(res => res.data)
    }
}
