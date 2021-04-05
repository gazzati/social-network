import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { ProfileType } from 'src/types/types'
import { unfollow } from 'src/redux/follow'

import userPhoto from 'src/assets/images/user.png'

import s from './style.module.scss'

type PropsType = {
  user: ProfileType
  unfollowingInProgress: Array<string>
  onSendMessage: (userId: string) => void
  type: 'followers' | 'following'
}

const FollowItem: FC<PropsType> = ({ user, unfollowingInProgress, onSendMessage, type }) => {
  const dispatch = useDispatch()

  return (
    <div className={s.followItem}>
      <div>
        <NavLink to={`profile:${user._id}`}>
          <img src={user.photo?.url ? user.photo?.url : userPhoto} className={s.photo} alt="" />
        </NavLink>
      </div>
      <div className={s.descriptionUser}>
        <div className={s.name}>{`${user.info.name} ${user.info.surname}`}</div>
        <div>{user.status}</div>
      </div>
      <span className={s.buttons}>
        <div className={`button button--primary ${s.chat}`} onClick={() => onSendMessage(user._id)}>
          Chat
        </div>
        {type === 'following' && (
          <button
            className={`button button--secondary ${s.unfollow}`}
            onClick={() => dispatch(unfollow(user._id))}
            disabled={unfollowingInProgress.some((id) => id === user._id)}
          >
            Unfollow
          </button>
        )}
      </span>
    </div>
  )
}

export default FollowItem
