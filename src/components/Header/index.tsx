import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import cn from 'classnames'

import { logout } from 'src/redux/auth'
import { toggleBlackTheme, toggleDynamicBackground } from 'src/redux/settings'
import { StateType } from 'src/redux'

import reactIcon from 'src/assets/images/reactIcon.png'
import userPhoto from 'src/assets/images/user.png'
import userLogIcon from 'src/assets/images/userLogIcon.png'

import s from './style.module.scss'

const Header: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false)
  const { isAuth, userData } = useSelector((state: StateType) => state.auth)
  const { isBlackThemeActivated, isDynamicBackgroundActivated } = useSelector((state: StateType) => state.settings)
  const dispatch = useDispatch()

  const handleLogoutClick = () => {
    dispatch(logout())
    setShowMenu(false)
  }

  return (
    <div className={s.header}>
      <div className={s.headerWrap}>
        <div className={s.mainIcon}>
          <NavLink to="/profile/" className={s.logoLink}>
            <img src={reactIcon} alt="" className={s.logo} />
          </NavLink>
          <p className={s.title}>
            GAZZATI
            <br /> SOCIAL NETWORK
          </p>
        </div>
        {userData && (
          <div>
            {isAuth ? (
              <span className={s.isAuthUserBlock}>
                <span className={s.userLogName}>{`${userData.name} ${userData.surname}`}</span>
                <img className={s.userPhoto} src={userData.photo || userPhoto} alt="" />
                <img className={s.function} src={userLogIcon} alt="" onClick={() => setShowMenu(!showMenu)} />
              </span>
            ) : (
              <NavLink to="/login" className={s.login}>
                Log in
              </NavLink>
            )}
          </div>
        )}
        {showMenu && (
          <>
            <div className={s.overlay} onClick={() => setShowMenu(!showMenu)} />
            <div className={s.content}>
              <div className={s.theme}>
                <span className={s.label}>Night theme</span>
                <span
                  onClick={() => dispatch(toggleBlackTheme(isBlackThemeActivated))}
                  className={cn({ [s.switchOn]: isBlackThemeActivated }, s.button)}
                />
              </div>
              <div className={s.theme}>
                <span className={s.label}>Dynamic background</span>
                <span
                  onClick={() => dispatch(toggleDynamicBackground(isDynamicBackgroundActivated))}
                  className={cn({ [s.switchOn]: isDynamicBackgroundActivated }, s.button)}
                />
              </div>
              <div className={s.exit} onClick={handleLogoutClick}>
                Exit from account
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Header
