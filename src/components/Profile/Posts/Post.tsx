import React from 'react'
import cn from 'classnames'

import { ProfileType } from 'src/types/types'
import formatDate from 'src/helpers/formatDate'

import userPhoto from 'src/assets/images/user.png'
import likeIcon from 'src/assets/images/like.png'
import removePost from 'src/assets/images/removePost.svg'

import s from './style.module.scss'

type PropsType = {
  message: string
  likesCount: number
  id: string
  date: string
  profile: ProfileType | null
  isOwner: boolean
  addLikes: (postId: string) => void
  deletePost: (postId: string) => void
}

const Post: React.FC<PropsType> = (props) => (
  <div className={s.item} key={props.id}>
    {props.profile && (
      <div className={s.user}>
        <div className={s.userInfo}>
          <img
            className={cn(s.userPhoto, { [s.malePhoto]: props.profile?.info.isMale })}
            src={props.profile.photo?.url ? props.profile.photo.url : userPhoto}
            alt=""
          />
          <div className={s.userDescription}>
            <div className={s.name}>{`${props.profile.info.name} ${props.profile.info.surname}`}</div>
            <div className={s.date}>{formatDate(props.date).getDate}</div>
          </div>
        </div>
        <img
          className={s.removePost}
          onClick={() => props.isOwner && props.deletePost(props.id)}
          src={removePost}
          alt=""
        />
      </div>
    )}
    <div className={s.bottomBlock}>
      <div className={s.text}>{props.message && props.message}</div>
      <div className={s.likes} onClick={() => props.addLikes(props.id)}>
        <span className={s.likeCount}>{props.likesCount}</span>
        <img src={likeIcon} alt="" />
      </div>
    </div>
  </div>
)

export default Post
