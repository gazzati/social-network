import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { compose } from 'redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import cn from 'classnames'

import { StateType } from 'src/redux'
import { disconnect, sendMessage, connect, getChatsData } from 'src/redux/dialogs'
import { MessageType } from 'src/types/types'
import formatDate from 'src/helpers/formatDate'

import leftIco from 'src/assets/images/left-arrow.svg'

import userPhoto from 'src/assets/images/user.png'
import Preloader from 'src/components/common/Preloader'
import AddMessageForm from './AddMessageForm'
import Message from './Message'
import DialogItem from './DialogItem'

import s from './style.module.scss'

type PropsType = RouteComponentProps<{ chatId?: string }>

const Dialogs: React.FC<PropsType> = ({ match }) => {
  const { chatId } = match.params
  const { userData } = useSelector((state: StateType) => state.auth)
  const { chats, messages, isFetching } = useSelector((state: StateType) => state.dialogs)

  const dispatch = useDispatch()

  const [isMessagesOpen, setIsMessagesOpen] = useState<boolean | null>(null)

  const authorizedUserId = userData.id
  const currentUser = chats.filter((chat) => chat._id === chatId)[0]
  let hasTodayMessage = false

  useEffect(() => {
    dispatch(connect())

    return () => {
      dispatch(disconnect())
    }
  }, [])

  useEffect(() => {
    dispatch(getChatsData(chatId))
  }, [chatId])

  useEffect(() => {
    const lastMessage =
      Array.isArray(messages) && messages.length && document.getElementById(messages[messages.length - 1]._id)
    lastMessage && lastMessage.scrollIntoView()
  })

  const messagesElements =
    Array.isArray(messages) &&
    messages.map((message: MessageType) => {
      let isFirstToday = false
      if (formatDate(message.date).isToday) {
        isFirstToday = !hasTodayMessage
        hasTodayMessage = true
      }
      return (
        <Message
          key={message._id}
          message={message}
          isItMe={authorizedUserId === message.senderId}
          isFirstToday={isFirstToday}
        />
      )
    })

  return (
    <div className={cn(s.dialogs, { [s.disableClicking]: isFetching })}>
      <div className={cn(s.dialogsItems, { [s.openDialogsItems]: isMessagesOpen })}>
        {isFetching && <Preloader />}
        {!isFetching && !chats.length ? (
          <div className={s.noChats}>No chats</div>
        ) : (
          chats.map((chat) => (
            <DialogItem
              key={chat._id}
              chat={chat}
              currentDialog={chatId}
              changeChat={() => setIsMessagesOpen(true)}
              isUnread={!!userData.id && !!chat.isUnreadFor.length && chat.isUnreadFor.includes(userData.id)}
            />
          ))
        )}
      </div>

      <div className={cn(s.messages, { [s.openMessages]: isMessagesOpen })}>
        <div className={s.topBlock}>
          <img className={s.topBlockArrow} src={leftIco} alt="" onClick={() => setIsMessagesOpen(false)} />
          {currentUser && (
            <div className={s.topBlockUser}>
              <div className={s.topBlockName}>{currentUser.title}</div>
              <img className={s.topBlockPhoto} src={currentUser.photo || userPhoto} alt="" />
            </div>
          )}
        </div>
        <ul className={s.messagesBlock}>
          {isFetching && <Preloader />}

          {messages === 'no choose' ? (
            <div className={s.noMessages}>Please choose chat</div>
          ) : messagesElements && messagesElements.length ? (
            messagesElements
          ) : (
            <div className={s.noMessages}>No messages</div>
          )}
        </ul>
        {!isFetching && (
          <AddMessageForm sendMessage={(messageText) => chatId && dispatch(sendMessage(chatId, messageText))} />
        )}
      </div>
    </div>
  )
}

export default compose(withRouter)(Dialogs)
