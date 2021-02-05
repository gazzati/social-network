import React, {FC, useState} from 'react'
import s from './style.module.css'
import User from './User'
import Paginator from '../common/Paginator'
import {ProfileType} from '../../types/types'
import Preloader from '../common/Preloader'

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<ProfileType>
    followingInProgress: Array<number>
    unfollow: (userId: string) => void
    follow: (userId: string) => void
    isFetching: boolean
    searchUsers: (newSearchRequest: string) => void
    currentUserId: string | null
}

let Users: FC<PropsType> = (props) => {
    const [searchTerm, setSearchTerm] = useState('')

    const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        props.searchUsers(searchTerm)
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchTerm(value)
        props.searchUsers(value)
    }

    return <div className={s.users}>
        {props.isFetching && <Preloader/>}
        <div className={s.search}>
            <h3>Find other users</h3>
            <form className="form--primary" onSubmit={onSearch}>
                <input className="form--primary-input"
                       type="text"
                       placeholder="Enter your request..."
                       value={searchTerm}
                       onChange={e => onChange(e)}/>
                <button className="button button--primary form--primary-button">Search</button>
            </form>
        </div>
        <div className={s.usersBlock}>
            {props.users.map(u =>
                <User user={u}
                      followingInProgress={props.followingInProgress}
                      unfollow={props.unfollow}
                      follow={props.follow}
                      key={u._id}
                      currentUserId={props.currentUserId}
                />
            )}
        </div>
        <Paginator currentPage={props.currentPage} onPageChanged={props.onPageChanged}
               totalItemsCount={props.totalUsersCount} pageSize={props.pageSize}/>
    </div>
}

export default Users
