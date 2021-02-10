import React, {useState} from 'react'
import s from './style.module.scss'
import Post from './Post'
import {ProfileType} from '../../../types/types'

type MapPropsType = {
    profile: ProfileType | null
}

type DispatchPropsType = {
    addPost: (text: string) => void
    addLikes: (postId: string) => void
    deletePost: (postId: string) => void
}

type OwnProps = {
    isOwner: boolean
}

const Posts: React.FC<MapPropsType & DispatchPropsType & OwnProps> = (props => {
    const [newPostText, setNewPostText] = useState('')

    const onAddPost = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        props.addPost(newPostText)
        setNewPostText('')
    }

    const postsElements =
        props.profile?.posts
            ?.sort((a, b) => a.date < b.date ? 1 : -1)
            .map(p =>
                <Post key={p._id}
                      message={p.message}
                      likesCount={p.likesCount}
                      id={p._id}
                      date={p.date}
                      profile={props.profile}
                      addLikes={props.addLikes}
                      deletePost={props.deletePost}
                      isOwner={props.isOwner}
                />
            )

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            {props.isOwner && <form className={`form--primary ${s.form}`} onSubmit={e => onAddPost(e)}>
                <input className="form--primary-input"
                       type="text"
                       placeholder="Enter your post..."
                       value={newPostText}
                       onChange={e => setNewPostText(e.target.value)}
                />
                <button className="button button--primary form--primary-button">Add post</button>
            </form>}
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
})

const MyPostsMemorized = React.memo(Posts)

export default MyPostsMemorized
