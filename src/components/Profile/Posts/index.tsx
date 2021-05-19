import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { StateType } from 'src/redux'
import { addPost, addLikes, deletePost } from 'src/redux/profile'

import Post from './Post'

import s from './style.module.scss'

const Posts: React.FC<{ isOwner: boolean }> = ({ isOwner }) => {
  const { profile } = useSelector((state: StateType) => state.profile)
  const dispatch = useDispatch()

  const [newPostText, setNewPostText] = useState('')

  const onAddPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(addPost(newPostText))
    setNewPostText('')
  }

  const postsElements = profile?.posts
    ?.sort((a, b) => (a.date < b.date ? 1 : -1))
    .map((p) => (
      <Post
        key={p._id}
        message={p.message}
        likesCount={p.likesCount}
        id={p._id}
        date={p.date}
        profile={profile}
        isOwner={isOwner}
        addLikes={(postId) => dispatch(addLikes(postId, profile._id))}
        deletePost={(postId) => dispatch(deletePost(postId))}
      />
    ))

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      {isOwner && (
        <form className={`form--primary ${s.form}`} onSubmit={(e) => onAddPost(e)}>
          <input
            className="form--primary-input"
            type="text"
            placeholder="Enter your post..."
            value={newPostText}
            onChange={(e) => setNewPostText(e.target.value)}
          />
          <button className="button button--primary form--primary-button">Add post</button>
        </form>
      )}
      <div className={s.posts}>{postsElements}</div>
    </div>
  )
}

export default Posts
