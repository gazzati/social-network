import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { getFollow } from '../../redux/follow-reducer'
import s from './style.module.scss'
import { StateType } from '../../redux'
import { getAllDialogs, startChat } from '../../redux/dialogs-reducer'
import Preloader from '../common/Preloader'
import FollowItem from './FollowItem'

type PropsType = {
  type: 'followers' | 'following'
}

const Follow: React.FC<PropsType> = ({ type }) => {
  const { following, followers, isFetching, unfollowingInProgress } = useSelector((state: StateType) => state.follow)
  const { chats, newChatId } = useSelector((state: StateType) => state.dialogs)
  const dispatch = useDispatch()

  const history = useHistory()
  const users = type === 'following' ? following : followers

  useEffect(() => {
    dispatch(getFollow(type))
  }, [type])

  const onSendMessage = async (userId: string) => {
    let chatId = chats.filter((chat) => chat.participants.includes(userId) && chat.participants.length === 2)[0]?._id
    if (!chatId) {
      await dispatch(startChat(userId))
      chatId = newChatId
    } else {
      dispatch(getAllDialogs(chatId))
    }
    history.push(`dialogs/${chatId}`)
  }

  return (
    <div className={s.followBlock}>
      {isFetching ? <Preloader /> : null}
      <div className={s.followTitle}>{type === 'followers' ? 'Followers' : 'Following'}</div>
      <div className={s.follow}>
        {users.length ? (
          users.map((user) => (
            <FollowItem
              user={user}
              key={user._id}
              type={type}
              unfollowingInProgress={unfollowingInProgress}
              onSendMessage={onSendMessage}
            />
          ))
        ) : (
          <div className={s.usersBlock}>Not found users</div>
        )}
      </div>
      {/* <Paginator currentPage={props.currentPage} onPageChanged={props.onPageChanged}
               totalItemsCount={props.totalFriendsCount} pageSize={props.pageSize}/> */}
    </div>
  )
}

export default Follow
