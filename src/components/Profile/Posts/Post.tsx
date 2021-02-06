import React from 'react'
import s from './style.module.scss'
import userPhoto from '../../../assets/images/user.png'
import likeIcon from '../../../assets/images/like.png'
import removePost from '../../../assets/images/removePost.svg'
import {ProfileType} from '../../../types/types'
import formatDate from '../../../helpers/formatDate'

type PropsType = {
    message: string
    likesCount: number
    id: string
    date: string
    profile: ProfileType | null
    addLikes: (postId: string) => void
    deletePost: (postId: string) => void
}

const Post: React.FC<PropsType> = (props) => {
    return (
        <div className={s.item} key={props.id}>
            {props.profile &&
            <div className={s.user}>
                <div className={s.userInfo}>
                    <img className={s.userPhoto}
                         src={props.profile && props.profile.photo ? props.profile.photo : userPhoto} alt={''}/>
                    <div className={s.userDescription}>
                        <div className={s.name}>{`${props.profile.info.name} ${props.profile.info.surname}`}</div>
                        <div className={s.date}>{formatDate(props.date).getDate}</div>
                    </div>
                </div>
                <img className={s.removePost} onClick={() => props.deletePost(props.id)} src={removePost} alt=""/>
            </div>
            }
            <div className={s.bottomBlock}>
                <div className={s.text}>
                    {props.message && props.message}
                </div>
                <div className={s.likes} onClick={() => props.addLikes(props.id)}>
                    <span className={s.likeCount}>{props.likesCount}</span>
                    <img src={likeIcon} alt=""/>
                </div>
            </div>
        </div>
    )
}

export default Post
