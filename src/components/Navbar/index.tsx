import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { logout } from 'src/redux/auth'
import { StateType } from 'src/redux'

import { DialogsIco, FollowersIco, FollowingIco, NewsIco, ProfileIco, SettingsIco, SignOut, UsersIco } from './Icons'

import s from './style.module.scss'

const Navbar: React.FC = () => {
  const dispatch = useDispatch()
  const { isAuth, userData } = useSelector((state: StateType) => state.auth)
  const { chats } = useSelector((state: StateType) => state.dialogs)
  const unreadMessagesCount = chats.filter(chat => userData.id && chat.isUnreadFor.includes(userData.id)).length

  return (
    <div className={s.navbar}>
      <NavLink
        exact
        to={`/profile${userData.id ? `/${userData.id}` : ''}`}
        className={s.link}
        activeClassName={s.activeItem}
      >
        <ProfileIco />
        <span className={s.item}>My Profile</span>
      </NavLink>

      <NavLink to="/dialogs" className={s.link} activeClassName={s.activeItem}>
        <DialogsIco />
        <span className={s.item}>Messages</span>
        {unreadMessagesCount ? <span className={s.messagesCount}>{unreadMessagesCount}</span> : null}
      </NavLink>

      <NavLink to="/users" className={s.link} activeClassName={s.activeItem}>
        <UsersIco />
        <span className={s.item}>Users</span>
      </NavLink>

      <NavLink to="/followers" className={s.link} activeClassName={s.activeItem}>
        <FollowersIco />
        <span className={s.item}>Followers</span>
      </NavLink>

      <NavLink to="/following" className={`${s.link} ${s.hideOnMobile}`} activeClassName={s.activeItem}>
        <FollowingIco />
        <span className={s.item}>Following</span>
      </NavLink>

      <NavLink to="/news" className={s.link} activeClassName={s.activeItem}>
        <NewsIco />
        <span className={s.item}>News</span>
      </NavLink>

      <NavLink to="/settings" className={`${s.link} ${s.hideOnMobile}`} activeClassName={s.activeItem}>
        <SettingsIco />
        <span className={s.item}>Settings</span>
      </NavLink>

      {isAuth && (
        <div className={`${s.link} ${s.hideOnMobile} ${s.itemLogout}`} onClick={() => dispatch(logout())}>
          <SignOut />
          <span className={s.item}>Exit from account</span>
        </div>
      )}
    </div>
  )
}

export default Navbar
