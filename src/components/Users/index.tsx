import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { requestUsers } from '../../redux/users-reducer'

import { StateType } from '../../redux'
import s from './style.module.scss'
import Preloader from '../common/Preloader'
import User from './User'
import Paginator from '../common/Paginator'

const Users: React.FC = () => {
  const { userData } = useSelector((state: StateType) => state.auth)
  const { users, totalUsersCount, pageSize, currentPage, isFetching, followingInProgress } = useSelector(
    (state: StateType) => state.users
  )
  const dispatch = useDispatch()

  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    dispatch(requestUsers(currentPage, searchTerm))
  }, [searchTerm])

  const onPageChanged = (pageNumber: number) => {
    dispatch(requestUsers(pageNumber, searchTerm))
  }

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSearchTerm(searchTerm)
    // dispatch(re) // TODO - reset page
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    // dispatch(re) // TODO - reset page
  }

  return (
    <div className={s.users}>
      {isFetching && <Preloader />}
      <div className={s.search}>
        <h3>Find other users</h3>
        <form className="form--primary" onSubmit={onSearch}>
          <input
            className="form--primary-input"
            type="text"
            placeholder="Enter your request..."
            value={searchTerm}
            onChange={(e) => onChange(e)}
          />
          <button className="button button--primary form--primary-button">Search</button>
        </form>
      </div>
      <div className={s.usersBlock}>
        {users.map((u) => (
          <User user={u} followingInProgress={followingInProgress} key={u._id} currentUserId={userData.id} />
        ))}
      </div>
      <div className={s.paginator}>
        <Paginator
          currentPage={currentPage}
          onPageChanged={onPageChanged}
          totalItemsCount={totalUsersCount}
          pageSize={pageSize}
        />
      </div>
    </div>
  )
}

export default Users
