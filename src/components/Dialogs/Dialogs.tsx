import React, {useEffect} from 'react'

import formatDate from '../../helpers/formatDate'

import s from './style.module.css'
import DialogItem from './DialogItem'
import Message from './Message'
import AddMessageForm from './AddMessageForm'
import {MessageType} from '../../types/types'
import {ChatType} from '../../types/types'
import Preloader from '../common/Preloader'

type PropsType = {
    chats: ChatType[]
    messages: MessageType[]
    isLoading: boolean
    sendMessage: (chatId: string, message: string) => void
    authorizedUserId: string
    currentChat: string
    setCurrentChat: (chatId: string) => void
    isCurrentChatChanged: boolean
}

const Dialogs: React.FC<PropsType> = (props) => {
    const messages = props.messages
    let haveTodayMessage = false

    const messagesElements = messages.map(m => {
            let isFirstToday = false
            if (formatDate(m.date).isToday) {
                isFirstToday = !haveTodayMessage
                haveTodayMessage = true
            }
            return <Message key={m._id}
                          message={m}
                          isItMe={props.authorizedUserId === m.senderId}
                          isFirstToday={isFirstToday}
            />
        }
    )

    useEffect(() => {
        const lastMessage = messages.length && document.getElementById(messages[messages.length - 1]._id)
        lastMessage && lastMessage.scrollIntoView()
    })

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {props.chats.map((d, index) =>
                    <DialogItem name={d.title}
                           key={d._id}
                           id={d._id}
                           photo={d.photo}
                           currentDialog={props.currentChat}
                           setCurrentChat={props.setCurrentChat}
                           defaultChecked={index === 0 && props.currentChat === 'all'}
                        /*hasNewMessage={d.hasNewMessages}
                        newMessagesCount={d.newMessagesCount}*/
                    />
                )}
            </div>

            {props.isLoading
                ? <Preloader/>
                : <div className={s.messages}>
                    <ul className={s.messagesBlock}>
                        {messagesElements.length ? messagesElements : <div className={s.noMessages}>No messages</div>}
                    </ul>
                    <AddMessageForm
                        sendMessage={(messageText: string) => props.sendMessage(props.currentChat, messageText)}/>
                </div>
            }
        </div>
    )
}

export default Dialogs
