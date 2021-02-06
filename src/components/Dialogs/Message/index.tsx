import React from 'react'
import s from '../style.module.scss'
import {MessageType} from '../../../types/types'
import formatDate from '../../../helpers/formatDate'

type PropsType = {
    message: MessageType
    isItMe: boolean
    isFirstToday: boolean
}

const Messaage: React.FC<PropsType> = ({ message, isItMe, isFirstToday }) => {
    let className = isItMe ? `${s.message} ${s.myMessage}` : s.message

    return (
        <>
            {isFirstToday && <div className={s.hr}>
                <div className={s.hrText}>Today</div>
                <div className={s.hrLine}/>
            </div>}
            <li id={message._id} className={className}>
                <div className={s.messageText}>{message.text}</div>
                <div className={s.messageDate}>
                    {formatDate(message.date).isToday
                        ? formatDate(message.date).getTime
                        : formatDate(message.date).getDate
                    }
                </div>
            </li>
        </>

    )
}

export default Messaage
