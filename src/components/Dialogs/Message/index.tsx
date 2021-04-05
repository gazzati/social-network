import React from 'react'
import { MessageType } from 'src/types/types'
import formatDate from 'src/helpers/formatDate'

import s from '../style.module.scss'

type PropsType = {
  message: MessageType
  isItMe: boolean
  isFirstToday: boolean
}

const Message: React.FC<PropsType> = ({ message, isItMe, isFirstToday }) => {
  const className = isItMe ? `${s.message} ${s.myMessage}` : s.message

  return (
    <>
      {isFirstToday && (
        <div className={s.hr}>
          <div className={s.hrText}>Today</div>
          <div className={s.hrLine} />
        </div>
      )}
      <li id={message._id} className={className}>
        <div className={s.messageText}>{message.text}</div>
        <div className={s.messageDate}>
          {formatDate(message.date).isToday ? formatDate(message.date).getTime : formatDate(message.date).getDate}
        </div>
      </li>
    </>
  )
}

export default Message
