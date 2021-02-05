import React, {useState} from 'react'
import {connect} from 'react-redux'
import {getUserProfile} from '../../redux/profile-reducer'
import {logout} from '../../redux/auth-reducer'
import {AppStateType} from '../../redux'
import {toggleBlackTheme} from '../../redux/settings-reducer'
import {UserDataType} from '../../types/types'
import s from './style.module.css'
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
    toggleBlackTheme: (theme: boolean) => void
}

const Header: React.FC<PropsType> = ({ isAuth, userData, logout, isBlackThemeActivated, toggleBlackTheme }) => {
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
                        <img className={s.userPhoto}
                             src={userData.photo ? userData.photo : userPhoto} alt=""/>
                        <img className={s.function} src={userLogIcon} alt="" onClick={showUserMenu}/>

                    </span>
                        : <NavLink to={'/login'} className={s.login}>Log in</NavLink>}
                </div>
                }
                {showMenu && <>
                    <div className={s.popup} onClick={showUserMenu}/>
                    <div className={s.content}>
                        <div className={s.night}>
                            <span className={s.label}>Night theme</span>
                            <span onClick={() => toggleBlackTheme(isBlackThemeActivated)}
                                  className={cn({ [s.switchOn]: isBlackThemeActivated }, s.button)}> </span>
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
    isBlackThemeActivated: state.settings.isBlackThemeActivated
})

export default connect(mapStateToProps, { getUserProfile, logout, toggleBlackTheme })(Header)
