import React, {useEffect, useState} from 'react'

import formatDate from '../../helpers/formatDate'

import s from './style.module.scss'
import DialogItem from './DialogItem'
import Message from './Message'
import AddMessageForm from './AddMessageForm'
import {MessageType} from '../../types/types'
import {ChatType} from '../../types/types'
import Preloader from '../common/Preloader'
import leftIco from '../../assets/images/left-arrow.svg'
import classNames from 'classnames'
import userPhoto from "../../assets/images/user.png";

type PropsType = {
    chats: ChatType[]
    messages: MessageType[] | 'no choose'
    isLoading: boolean
    sendMessage: (chatId: string, message: string) => void
    authorizedUserId: string
    currentChat: string
    setCurrentChat: (chatId: string) => void
    isCurrentChatChanged: boolean
}

const Dialogs: React.FC<PropsType> = (props) => {
    const [isMessagesOpen, setIsMessagesOpen] = useState(props.currentChat !== 'all')
    const currentUser = props.chats.filter(user => user._id === props.currentChat)[0]
    const messages = props.messages
    let haveTodayMessage = false

    const setCurrentChat = (chatId: string) => {
        props.setCurrentChat(chatId)
        setIsMessagesOpen(true)
    }

    const messagesElements = Array.isArray(messages) && messages.map(m => {
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
        const lastMessage = Array.isArray(messages) && messages.length && document.getElementById(messages[messages.length - 1]._id)
        lastMessage && lastMessage.scrollIntoView()
    })

    return (
        <div className={s.dialogs}>
            <div className={classNames(s.dialogsItems, {[s.openDialogsItems]: isMessagesOpen})}>
                {!props.chats.length
                    ? <div className={s.noChats}>No chats</div>
                    : props.chats.map((d, index) =>
                        <DialogItem name={d.title}
                                    key={d._id}
                                    id={d._id}
                                    photo={d.photo}
                                    currentDialog={props.currentChat}
                                    setCurrentChat={setCurrentChat}
                        />)
                }
            </div>

            {props.isLoading
                ? <Preloader/>
                : <div className={classNames(s.messages, {[s.openMessages]: isMessagesOpen})}>
                    <div className={s.topBlock}>
                        <img className={s.topBlockArrow} src={leftIco} alt="" onClick={() => setIsMessagesOpen(false)}/>
                        {currentUser &&
                        <div className={s.topBlockUser}>
                            <div className={s.topBlockName}>{currentUser.title}</div>
                            <img className={s.topBlockPhoto} src={currentUser.photo || userPhoto} alt={''}/>
                        </div>}
                    </div>
                    <ul className={s.messagesBlock}>
                        {messages === 'no choose' ? <div className={s.noMessages}>Please choose chat</div>
                            : messagesElements && messagesElements.length
                                ? messagesElements
                                : <div className={s.noMessages}>No messages</div>
                        }
                    </ul>
                    <AddMessageForm
                        sendMessage={(messageText: string) => props.sendMessage(props.currentChat, messageText)}/>
                </div>
            }
        </div>
    )
}

export default Dialogs
