import React from 'react'
import { NavLink } from 'react-router-dom'
import cn from 'classnames'

import { ChatType } from 'src/types/types'

import userPhoto from 'src/assets/images/user.png'

import s from '../style.module.scss'

type PropsType = {
  chat: ChatType
  currentDialog?: string
  changeChat: () => void
  isUnread?: boolean
}

const DialogItem: React.FC<PropsType> = ({ chat, currentDialog, changeChat, isUnread }) => (
  <NavLink
    to={`/dialogs/${chat._id}`}
    className={cn(s.item, { [s.activeDialogItem]: currentDialog === chat._id })}
    onClick={changeChat}
  >
    <img src={chat.photo || userPhoto} alt="" />
    <div className={s.userName}>{chat.title}</div>
    <div className={cn(s.unreadTicket, { [s.activeTicket]: isUnread })} />
  </NavLink>
)

export default DialogItem
