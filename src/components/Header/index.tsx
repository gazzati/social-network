import React, {useState} from 'react'
import {connect} from 'react-redux'
import {getUserProfile} from '../../redux/profile-reducer'
import {logout} from '../../redux/auth-reducer'
import {AppStateType} from '../../redux'
import {toggleBlackTheme, toggleDynamicBackground} from '../../redux/settings-reducer'
import {UserDataType} from '../../types/types'
import s from './style.module.scss'
import {NavLink} from 'react-router-dom'
import reactIcon from '../../assets/images/reactIcon.png'
import userPhoto from '../../assets/images/user.png'
import userLogIcon from '../../assets/images/userLogIcon.png'
import cn from 'classnames'

export type PropsType = {
    isAuth: boolean
    userData: UserDataType
    logout: () => void
    isBlackThemeActivated: boolean
    isDynamicBackgroundActivated: boolean
    toggleBlackTheme: (theme: boolean) => void
    toggleDynamicBackground: (theme: boolean) => void
}

const Header: React.FC<PropsType> = ({
                                         isAuth, userData, logout, isBlackThemeActivated,
                                         toggleBlackTheme, isDynamicBackgroundActivated, toggleDynamicBackground
                                     }) => {
    let [showMenu, setShowMenu] = useState(false)

    const showUserMenu = () => {
        setShowMenu(!showMenu)
    }

    const handleLogoutClick = () => {
        logout()
        setShowMenu(false)
    }

    return (
        <div className={s.header}>
            <div className={s.headerWrap}>
                <div className={s.mainIcon}>
                    <NavLink to="/profile/" className={s.logoLink}>
                        <img src={reactIcon} alt={''} className={s.logo}/>
                    </NavLink>
                    <p className={s.title}>GAZZATI <br/> SOCIAL NETWORK</p>
                </div>
                {userData &&
                <div className={s.userBlock}>
                    {isAuth
                        ? <span className={s.isAuthUserBlock}>
                        <span className={s.userLogName}>{`${userData.name} ${userData.surname}`}</span>
                        <img className={s.userPhoto} src={userData.photo || userPhoto} alt=""/>
                        <img className={s.function} src={userLogIcon} alt="" onClick={showUserMenu}/>
                    </span>
                        : <NavLink to={'/login'} className={s.login}>Log in</NavLink>}
                </div>
                }
                {showMenu && <>
                    <div className={s.overlay} onClick={showUserMenu}/>
                    <div className={s.content}>
                        <div className={s.theme}>
                            <span className={s.label}>Night theme</span>
                            <span onClick={() => toggleBlackTheme(isBlackThemeActivated)}
                                  className={cn({[s.switchOn]: isBlackThemeActivated}, s.button)}/>
                        </div>
                        <div className={s.theme}>
                            <span className={s.label}>Dynamic background</span>
                            <span onClick={() => toggleDynamicBackground(isDynamicBackgroundActivated)}
                                  className={cn({[s.switchOn]: isDynamicBackgroundActivated}, s.button)}/>
                        </div>
                        <div className={s.exit} onClick={handleLogoutClick}>Exit from account</div>
                    </div>
                </>}
            </div>
        </div>
    )
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    userData: state.auth.userData,
    isBlackThemeActivated: state.settings.isBlackThemeActivated,
    isDynamicBackgroundActivated: state.settings.isDynamicBackgroundActivated
})

export default connect(mapStateToProps, {getUserProfile, logout, toggleBlackTheme, toggleDynamicBackground})(Header)
