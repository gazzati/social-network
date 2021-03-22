import profileReducer, {actions} from './profile-reducer'
import {PostType, ProfileType} from '../types/types'

const state = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 12 },
        { id: 2, message: 'Hi, how', likesCount: 1 },
        { id: 3, message: 'Hi,re you?', likesCount: 21 },
        { id: 4, message: 'It\'s my first post', likesCount: 11 },
        { id: 5, message: 'Hi, how', likesCount: 1 },
        { id: 6, message: 'It\'s my first post', likesCount: 11 },
        { id: 7, message: 'Hi, how', likesCount: 1 },
        { id: 8, message: 'It\'s my first post', likesCount: 11 },
        { id: 9, message: 'Hi, how are you?', likesCount: 12 }
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    isFetching: true
}

it('length of posts should be incremented', () => {
    const action = actions.addPostActionCreator('it-it')
    const newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(10)
})

it('message of post should be correct', () => {
    const action = actions.addPostActionCreator('it-it')
    const newState = profileReducer(state, action)
    expect(newState.posts[9].message).toBe('it-it')
})

it('after deleting length of messages should be decrement', () => {
    const action = actions.deletePost(1)
    const newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(8)
})

it('after deleting length shouldn`t be decrement if id is incorrect', () => {
    const action = actions.deletePost(1000)
    const newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(9)
})

