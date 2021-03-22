import React, {FC} from 'react'
import s from './style.module.scss'
import userPhoto from '../../assets/images/user.png'
import {NavLink} from 'react-router-dom'
import {ProfileType} from '../../types/types'

type PropsType = {
    user: ProfileType
    unfollow: (userId: string) => void
    unfollowingInProgress: Array<string>
    onSendMessage: (userId: string) => void
    type: 'followers' | 'following'
}

const FollowItem: FC<PropsType> = ({ user, unfollow, unfollowingInProgress, onSendMessage , type}) => {
    return (
        <div className={s.followItem}>
            <div>
                <NavLink to={'profile/' + user._id}>
                    <img src={user.photo?.url ? user.photo?.url : userPhoto}
                         className={s.photo} alt={''}/>
                </NavLink>
            </div>
            <div className={s.descriptionUser}>
                <div className={s.name}>{`${user.info.name} ${user.info.surname}`}</div>
                <div>{user.status}</div>
            </div>
            <span className={s.buttons}>
                <div className={`button button--primary ${s.chat}`} onClick={() => onSendMessage(user._id)}>Chat</div>
                {type === 'following' &&
                <button className={`button button--secondary ${s.unfollow}`}
                        onClick={() => unfollow(user._id)}
                        disabled={unfollowingInProgress.some(id => id === user._id)}>
                    Unfollow
                </button>
                }
            </span>
        </div>)
}

export default FollowItem
