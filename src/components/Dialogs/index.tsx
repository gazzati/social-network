import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { compose } from 'redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import classNames from 'classnames'

import { getAllDialogs, sendMessage } from '../../redux/dialogs-reducer'
import { StateType } from '../../redux'
import formatDate from '../../helpers/formatDate'

import leftIco from '../../assets/images/left-arrow.svg'
import DialogItem from './DialogItem'
import userPhoto from '../../assets/images/user.png'
import Preloader from '../common/Preloader'
import AddMessageForm from './AddMessageForm'
import Message from './Message'

import s from './style.module.scss'

type PropsType = RouteComponentProps<{ chatId: string }>

const Dialogs: React.FC<PropsType> = ({ match }) => {
  const { userData } = useSelector((state: StateType) => state.auth)
  const { chats, messages, isFetching } = useSelector((state: StateType) => state.dialogs)
  const dispatch = useDispatch()

  const currentChat = match.params.chatId || 'all'
  const [isCurrentChatChanged, setIsCurrentChatChanged] = useState(false)

  const [isMessagesOpen, setIsMessagesOpen] = useState(currentChat !== 'all')
  const currentUser = chats.filter((user) => user._id === currentChat)[0]
  let haveTodayMessage = false

  const authorizedUserId = userData.id || ''

  useEffect(() => {
    !chats.length && dispatch(getAllDialogs(currentChat))
  }, [])

  useEffect(() => {
    const lastMessage =
      Array.isArray(messages) && messages.length && document.getElementById(messages[messages.length - 1]._id)
    lastMessage && lastMessage.scrollIntoView()
  })

  const setCurrentChat = (chatId: string) => {
    if (!isCurrentChatChanged) {
      setIsCurrentChatChanged(true)
    }
    if (chatId !== currentChat) {
      dispatch(getAllDialogs(chatId))
    }
    setIsMessagesOpen(true)
  }

  const messagesElements =
    Array.isArray(messages) &&
    messages.map((m) => {
      let isFirstToday = false
      if (formatDate(m.date).isToday) {
        isFirstToday = !haveTodayMessage
        haveTodayMessage = true
      }
      return <Message key={m._id} message={m} isItMe={authorizedUserId === m.senderId} isFirstToday={isFirstToday} />
    })

  return (
    <div className={s.dialogs}>
      <div className={classNames(s.dialogsItems, { [s.openDialogsItems]: isMessagesOpen })}>
        {!chats.length ? (
          <div className={s.noChats}>No chats</div>
        ) : (
          chats.map((d, index) => (
            <DialogItem
              name={d.title}
              key={d._id}
              id={d._id}
              photo={d.photo}
              currentDialog={currentChat}
              setCurrentChat={setCurrentChat}
              defaultChecked={currentChat === 'all' && index === 0}
            />
          ))
        )}
      </div>

      <div className={classNames(s.messages, { [s.openMessages]: isMessagesOpen })}>
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
        <AddMessageForm
          sendMessage={(messageText: string) =>
            dispatch(sendMessage(currentChat !== 'all' ? currentChat : chats[0]._id, messageText))
          }
        />
      </div>
    </div>
  )
}

export default compose(withRouter)(Dialogs)
