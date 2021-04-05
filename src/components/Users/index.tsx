import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { requestUsers, resetCurrentPage, follow, unfollow } from 'src/redux/users'
import { StateType } from 'src/redux'

import Preloader from 'src/components/common/Preloader'
import Paginator from 'src/components/common/Paginator'
import User from './User'

import s from './style.module.scss'

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
    dispatch(resetCurrentPage)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    dispatch(resetCurrentPage)
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
        {users.length ? (
          users.map((u) => (
            <User
              user={u}
              followingInProgress={followingInProgress}
              key={u._id}
              currentUserId={userData.id}
              follow={(userId) => dispatch(follow(userId))}
              unfollow={(userId) => dispatch(unfollow(userId))}
            />
          ))
        ) : (
          <div className={s.notFound}>Not found users</div>
        )}
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
