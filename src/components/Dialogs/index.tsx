import React, { useEffect, createRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { compose } from 'redux'
import { RouteComponentProps, useHistory, withRouter } from 'react-router-dom'
import cn from 'classnames'

import { StateType } from 'src/redux'
import { resetNewChatId } from 'src/redux/dialogs'
import { sendMessage, getChatsData } from 'src/redux/socket'
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
  const dispatch = useDispatch()
  const history = useHistory()
  const chatsBlock = createRef<HTMLDivElement>()
  const { chatId } = match.params
  const { userData } = useSelector((state: StateType) => state.auth)
  const { chats, messages, newChatId, isFetching } = useSelector((state: StateType) => state.dialogs)

  const [isMessagesOpen, setIsMessagesOpen] = useState<boolean | null>(null)

  const authorizedUserId = userData.id
  const currentUser = chats.filter((chat) => chat._id === chatId)[0]
  let hasTodayMessage = false

  useEffect(() => {
    dispatch(getChatsData(chatId))
  }, [])

  useEffect(() => {
    if (!newChatId && !chatId && chats.length) {
      history.push(`dialogs/${chats[0]._id}`)
    }
  }, [chats])

  useEffect(() => {
    if (newChatId && chats.length) {
      history.push(newChatId)
      dispatch(resetNewChatId())
    }
  }, [newChatId])

  useEffect(() => {
    const lastMessage =
      Array.isArray(messages) && messages.length && document.getElementById(messages[messages.length - 1]._id)
    lastMessage && lastMessage.scrollIntoView()

    const currentChat = chatId && Array.isArray(chats) && chats.length && document.getElementById(chatId)
    if(currentChat && chatsBlock.current && (currentChat.offsetTop + currentChat.scrollTop > chatsBlock.current.offsetHeight)) {
      currentChat.scrollIntoView()
    }
  })

  const changeChat = (chatId: string) => {
    dispatch(getChatsData(chatId))
    setIsMessagesOpen(true)
  }

  const messagesElements = Array.isArray(messages) && messages.map((message: MessageType) => {
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
      <div className={cn(s.dialogsItems, { [s.openDialogsItems]: isMessagesOpen })} ref={chatsBlock}>
        {isFetching && <Preloader />}
        {!isFetching && !chats.length ? (
          <div className={s.noChats}>No chats</div>
        ) : (
          chats.map((chat) => (
            <DialogItem
              key={chat._id}
              chat={chat}
              currentDialog={chatId}
              changeChat={changeChat}
              isUnread={!!userData.id && !!chat.isUnreadFor.length && chat.isUnreadFor.includes(userData.id)}
            />
          ))
        )}
      </div>

      <div className={cn(s.messages, { [s.openMessages]: isMessagesOpen })}>
        <div className={s.topBlock}>
          <img className={s.topBlockArrow} src={leftIco} alt='' onClick={() => setIsMessagesOpen(false)} />
          {currentUser && (
            <div className={s.topBlockUser}>
              <div className={s.topBlockName}>{currentUser.title}</div>
              <img
                className={cn(s.topBlockPhoto, { [s.topBlockMalePhoto]: currentUser.isMale })}
                src={currentUser.photo || userPhoto}
                alt=''
              />
            </div>
          )}
        </div>
        <ul className={s.messagesBlock}>
          {isFetching && <Preloader />}

          {!chatId
            ? !isFetching && <div className={s.noMessages}>Please choose chat</div>
            : messagesElements && messagesElements.length
              ? messagesElements
              : !isFetching && <div className={s.noMessages}>No messages</div>}
        </ul>
        {!isFetching && (
          <AddMessageForm
            disabled={!chatId}
            sendMessage={(messageText) => chatId && dispatch(sendMessage(chatId, messageText))}
          />
        )}
      </div>
    </div>
  )
}

export default compose(withRouter)(Dialogs)
