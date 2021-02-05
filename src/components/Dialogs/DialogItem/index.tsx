import React from 'react'
import s from '../style.module.css'
import {NavLink} from 'react-router-dom'
import userPhoto from '../../../assets/images/user.png'

type PropsType = {
    id: string
    name: string
    photo: string | null
    currentDialog: string
    setCurrentChat: (chatId: string) => void
    defaultChecked?: boolean
    /*hasNewMessage: boolean
    newMessagesCount: number*/
}

const DialogItem: React.FC<PropsType> = (props) => {
    let className = props.currentDialog === props.id ? `${s.item} ${s.activeDialogItem}` :
        props.defaultChecked ? `${s.item} ${s.activeDialogItem}` : s.item
    return (
        <NavLink to={'/dialogs/' + props.id} className={className} onClick={() => props.setCurrentChat(props.id)}>
            <img src={props.photo || userPhoto} alt={''}/>
            <div className={s.userName}>{props.name}</div>
        </NavLink>
    )
}

export default DialogItem
