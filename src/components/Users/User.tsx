import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { ProfileType } from '../../types/types'
import { unfollow, follow } from '../../redux/users-reducer'

import userPhoto from '../../assets/images/user.png'

import s from './style.module.scss'

type PropsType = {
  user: ProfileType
  followingInProgress: Array<number>
  currentUserId: string | null
}

const User: FC<PropsType> = ({ user, currentUserId }) => {
  const dispatch = useDispatch()

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
              <button /* disabled={followingInProgress.some(id => id === user.userId)} */
                className="button button--secondary"
                onClick={() => {
                  dispatch(unfollow(user._id))
                }}
              >
                Unfollow
              </button>
            ) : (
              <button /* disabled={followingInProgress.some(id => id === user.userId)} */
                className="button button--primary"
                onClick={() => {
                  dispatch(follow(user._id))
                }}
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
