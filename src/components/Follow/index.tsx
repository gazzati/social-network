import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { getFollow } from 'src/redux/follow'
import { StateType } from 'src/redux'

import Preloader from 'src/components/common/Preloader'
import FollowItem from './FollowItem'

import s from './style.module.scss'

type PropsType = {
  type: 'followers' | 'following'
}

const Follow: React.FC<PropsType> = ({ type }) => {
  const { following, followers, isFetching, unfollowingInProgress } = useSelector((state: StateType) => state.follow)
  const { chats } = useSelector((state: StateType) => state.dialogs)
  const dispatch = useDispatch()

  const history = useHistory()
  const users = type === 'following' ? following : followers

  useEffect(() => {
    dispatch(getFollow(type))
  }, [type])

  const onSendMessage = async (userId: string) => {
    const chatId = chats.filter((chat) => chat.participants.includes(userId) && chat.participants.length === 2)[0]
      ?._id

    history.replace(`/dialogs/${chatId || userId}`, `/${type}`)
  }

  return (
    <div className={s.followBlock}>
      {isFetching ? <Preloader /> : null}
      <div className={s.followTitle}>{type === 'followers' ? 'Followers' : 'Following'}</div>
      <div className={s.follow}>
        {users.length
          ? users.map((user) => (
              <FollowItem
                user={user}
                key={user._id}
                type={type}
                unfollowingInProgress={unfollowingInProgress}
                onSendMessage={onSendMessage}
              />
            ))
          : !isFetching && <div className={s.usersBlock}>Not found users</div>}
      </div>
    </div>
  )
}

export default Follow
