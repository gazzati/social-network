import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import s from './style.module.scss'
import { logout } from '../../redux/auth-reducer'
import { AppStateType } from '../../redux'
import { DialogsIco, FollowersIco, FollowingIco, NewsIco, ProfileIco, SettingsIco, SignOut, UsersIco } from './Icons'

import { getUserProfile } from '../../redux/profile-reducer'

const mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
  authorizedUserId: state.auth.userData.id,
  currentUserId: state.profilePage.profile._id
})

type PropsType = {
  isAuth: boolean
  authorizedUserId: string | null
  currentUserId: string | null
  logout: () => void
}

const Navbar: React.FC<PropsType> = ({ isAuth, authorizedUserId, currentUserId, logout }) => {
  const history = useHistory()

  const getIsActive = () => {
    const url = history.location.pathname
    return url.includes('user') || (url.includes('profile') && authorizedUserId !== currentUserId)
  }

  return (
    <div className={s.navbar}>
      <NavLink exact to={`/profile/${authorizedUserId}`} className={s.link} activeClassName={s.activeItem}>
        <ProfileIco />
        <span className={s.item}>My Profile</span>
      </NavLink>

      <NavLink to="/dialogs" className={s.link} activeClassName={s.activeItem}>
        <DialogsIco />
        <span className={s.item}>Messages</span>
      </NavLink>

      <NavLink to="/users" isActive={getIsActive} className={s.link} activeClassName={s.activeItem}>
        <UsersIco />
        <span className={s.item}>Users</span>
      </NavLink>

      <NavLink to="/followers" className={s.link} activeClassName={s.activeItem}>
        <FollowersIco />
        <span className={s.item}>Followers</span>
      </NavLink>

      <NavLink to="/following" className={s.link} activeClassName={s.activeItem}>
        <FollowingIco />
        <span className={s.item}>Following</span>
      </NavLink>

      <NavLink to="/news" className={`${s.link} ${s.hideOnMobile}`} activeClassName={s.activeItem}>
        <NewsIco />
        <span className={s.item}>News</span>
      </NavLink>

      <NavLink to="/settings" className={`${s.link} ${s.hideOnMobile}`} activeClassName={s.activeItem}>
        <SettingsIco />
        <span className={s.item}>Settings</span>
      </NavLink>

      {isAuth && (
        <div className={`${s.link} ${s.hideOnMobile} ${s.itemLogout}`} onClick={logout}>
          <SignOut />
          <span className={s.item}>Exit from account</span>
        </div>
      )}
    </div>
  )
}

export default connect(mapStateToProps, { logout, getUserProfile })(Navbar)
