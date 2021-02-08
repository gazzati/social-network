import React, {FC} from 'react'
import s from './style.module.scss'
import userPhoto from '../../assets/images/user.png'
import {NavLink} from 'react-router-dom'
import {ProfileType} from '../../types/types'

type PropsType = {
    user: ProfileType
    followingInProgress: Array<number>
    unfollow: (userId: string) => void
    follow: (userId: string) => void
    currentUserId: string | null
}

const User: FC<PropsType> = ({ user, currentUserId, followingInProgress, unfollow, follow }) => {
    return (
        <div className={s.userContainer}>
            <div className={s.user}>
                <NavLink to={'profile/' + user._id}>
                    <img src={user.photo?.url ? user.photo?.url : userPhoto}
                         className={s.photo} alt={''}/>
                </NavLink>
                <div className={s.descriptionUser}>
                    <div className={s.name}>{user.info.name}</div>
                    <div>{user.status}</div>
                </div>
                {currentUserId &&
                <div className={s.fol}>
                    {currentUserId && user.followers.includes(currentUserId)
                        ? <button /*disabled={followingInProgress.some(id => id === user.userId)}*/
                            className="button button--secondary"
                            onClick={() => {
                                unfollow(user._id)
                            }}>
                            Unfollow
                        </button>

                        : <button /*disabled={followingInProgress.some(id => id === user.userId)}*/
                            className="button button--primary"
                            onClick={() => {
                                follow(user._id)
                            }}>
                            Follow
                        </button>}
                </div>
                }
            </div>
        </div>)
}

export default User
