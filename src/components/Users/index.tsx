import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { actions, follow, requestUsers, unfollow } from '../../redux/users-reducer'
import Users from './Users'
import { ProfileType } from '../../types/types'
import { AppStateType } from '../../redux'

type MapStatePropsType = {
  currentPage: number
  pageSize: number
  isFetching: boolean
  totalUsersCount: number
  users: Array<ProfileType>
  followingInProgress: Array<number>
  currentUserId: string | null
}

type MapDispatchPropsType = {
  getUsers: (currentPage: number, term: string) => void
  unfollow: (userId: string) => void
  follow: (userId: string) => void
  resetCurrentPage: () => void
}

type OwnPropsType = {}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const UsersContainer: React.FC<PropsType> = (props) => {
  const [searchRequest, setSearchRequest] = useState('')

  useEffect(() => {
    const { currentPage } = props
    props.getUsers(currentPage, searchRequest)
  }, [searchRequest])

  const onPageChanged = (pageNumber: number) => {
    props.getUsers(pageNumber, searchRequest)
  }

  const searchUsers = (newSearchRequest: string) => {
    setSearchRequest(newSearchRequest)
    props.resetCurrentPage()
  }

  return (
    <>
      <Users
        totalUsersCount={props.totalUsersCount}
        pageSize={props.pageSize}
        currentPage={props.currentPage}
        onPageChanged={onPageChanged}
        users={props.users}
        unfollow={props.unfollow}
        follow={props.follow}
        followingInProgress={props.followingInProgress}
        isFetching={props.isFetching}
        searchUsers={searchUsers}
        currentUserId={props.currentUserId}
      />
    </>
  )
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  users: state.usersPage.users,
  pageSize: state.usersPage.pageSize,
  totalUsersCount: state.usersPage.totalUsersCount,
  currentPage: state.usersPage.currentPage,
  isFetching: state.usersPage.isFetching,
  followingInProgress: state.usersPage.followingInProgress,
  currentUserId: state.auth.userData.id
})

export default compose(
  connect(mapStateToProps, {
    follow,
    unfollow,
    getUsers: requestUsers,
    resetCurrentPage: actions.resetCurrentPage
  })
)(UsersContainer)
