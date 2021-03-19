import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {useHistory} from 'react-router-dom'

import {getFollow, unfollow} from '../../redux/follow-reducer'
import s from './style.module.scss'
import {AppStateType} from '../../redux'
import {getAllDialogs, startChat} from '../../redux/dialogs-reducer'
import Preloader from '../common/Preloader'
import FollowItem from './FollowItem'

type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getFollow: (type: 'followers' | 'following') => void
    unfollow: (userId: string) => void
    startChat: (chatId?: string) => string
    getAllDialogs: (chatId?: string) => void
}

type OwnPropsType = {
    type: 'followers' | 'following'
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const Follow: React.FC<PropsType> = (props) => {
    const users = props[props.type]
    const history = useHistory()

    useEffect(() => {
        props.getFollow(props.type)
        // eslint-disable-next-line
    }, [props.type])

    const onSendMessage = async (userId: string) => {
        let chatId = props.chats.filter(chat =>
            chat.participants.includes(userId) && chat.participants.length === 2)[0]?._id
        if (!chatId) {
            chatId = await props.startChat(userId)
        } else {
            props.getAllDialogs(chatId)
        }
        history.push(`dialogs/${chatId}`)
    }

    return (
        <div className={s.followBlock}>
            {props.isLoading ? <Preloader/> : null}
            <div className={s.followTitle}>{props.type === 'followers' ? 'Followers' : 'Following'}</div>
            <div className={s.follow}>
                {users?.map(user =>
                    <FollowItem user={user}
                                key={user._id}
                                type={props.type}
                                unfollow={props.unfollow}
                                unfollowingInProgress={props.unfollowingInProgress}
                                onSendMessage={onSendMessage}
                    />
                )}
            </div>
            {/* <Paginator currentPage={props.currentPage} onPageChanged={props.onPageChanged}
               totalItemsCount={props.totalFriendsCount} pageSize={props.pageSize}/>*/}
        </div>
    )
}

const mapStateToProps = (state: AppStateType) => {
    return {
        following: state.follow.following,
        followers: state.follow.followers,
        pageSize: state.follow.pageSize,
        totalFriendsCount: state.follow.totalFriendsCount,
        currentPage: state.follow.currentPage,
        isLoading: state.follow.isFetching,
        unfollowingInProgress: state.follow.unfollowingInProgress,
        chats: state.dialogsPage.chats
    }
}

export default compose<React.FC<OwnPropsType>>(
    connect(mapStateToProps, { getFollow, unfollow, startChat, getAllDialogs }))(Follow)
