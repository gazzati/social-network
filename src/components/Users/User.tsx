import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import cn from 'classnames'

import { ProfileType } from 'src/types/types'
import userPhoto from 'src/assets/images/user.png'

import s from './style.module.scss'

type PropsType = {
  user: ProfileType
  followingInProgress: Array<string>
  currentUserId: string | null
  follow: (userId: string) => void
  unfollow: (userId: string) => void
}

const User: FC<PropsType> = ({ user, currentUserId, followingInProgress, follow, unfollow }) => {
  const isDisabled = followingInProgress.includes(user._id)
  return (
    <div className={s.userContainer}>
      <div className={s.user}>
        <NavLink to={`profile:${user._id}`}>
          <img src={user.photo?.url ? user.photo?.url : userPhoto} className={s.photo} alt="" />
        </NavLink>
        <div className={s.descriptionUser}>
          <div className={s.name}>{user.info.name}</div>
          <div>{user.status}</div>
        </div>
        {currentUserId && currentUserId !== user._id && (
          <div className={s.fol}>
            {currentUserId && user.followers.includes(currentUserId) ? (
              <button
                disabled={isDisabled}
                className={cn('button button--secondary', { 'button--disabled': isDisabled })}
                onClick={() => unfollow(user._id)}
              >
                Unfollow
              </button>
            ) : (
              <button
                disabled={isDisabled}
                className={cn('button button--primary', { 'button--disabled': isDisabled })}
                onClick={() => follow(user._id)}
              >
                Follow
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default User
