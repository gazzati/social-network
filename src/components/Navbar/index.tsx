import React from 'react'
import s from './style.module.scss'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../../redux/auth-reducer'
import {AppStateType} from '../../redux'
import {ProfileIco} from './Icons'
import {DialogsIco} from './Icons'
import {FollowIco} from './Icons'
import {NewsIco} from './Icons'
import {SettingsIco} from './Icons'
import {SignOut} from './Icons'
import {UsersIco} from './Icons'

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})

type PropsType = {
    isAuth: boolean
    logout: () => void
}

const Navbar: React.FC<PropsType> = ({ isAuth, logout }) => {
    return (
        <div className={s.navbar}>
            <NavLink to="/profile" className={s.link} activeClassName={s.activeItem}>
                <ProfileIco/>
                <span className={s.item}>My Profile</span>
            </NavLink>

            <NavLink to="/dialogs" className={s.link} activeClassName={s.activeItem}>
                <DialogsIco/>
                <span className={s.item}>Messages</span>
            </NavLink>

            <NavLink to="/users" className={s.link} activeClassName={s.activeItem}>
                <UsersIco/>
                <span className={s.item}>Users</span>
            </NavLink>

            <NavLink to="/following" className={`${s.link} ${s.hideOnMobile}`} activeClassName={s.activeItem}>
                <FollowIco/>
                <span className={s.item}>Following</span>
            </NavLink>

            <NavLink to="/followers" className={s.link} activeClassName={s.activeItem}>
                <FollowIco/>
                <span className={s.item}>Followers</span>
            </NavLink>

            <NavLink to="/news" className={s.link} activeClassName={s.activeItem}>
                <NewsIco/>
                <span className={s.item}>News</span>
            </NavLink>

            {/*<NavLink to="/music" className={s.link} activeClassName={s.activeItem}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 17.998">
                    <path className="a"
                        d="M17.76.141a.651.651,0,0,0-.541-.126L5.647,2.586a.643.643,0,0,0-.5.627v10.17a3.719,3.719,0,0,0-1.929-.527C1.443,12.856,0,14.01,0,15.428S1.443,18,3.214,18s3.214-1.153,3.214-2.571V7.586L16.714,5.3v5.512a3.719,3.719,0,0,0-1.929-.527c-1.773,0-3.214,1.153-3.214,2.571s1.441,2.571,3.214,2.571S18,14.274,18,12.856V.642A.639.639,0,0,0,17.76.141Z"
                        transform="translate(0 -0.001)" />
                </svg>
                <span className={s.item}>Music</span>
            </NavLink>*/}

            <NavLink to="/settings" className={`${s.link} ${s.hideOnMobile}`} activeClassName={s.activeItem}>
                <SettingsIco/>
                <span className={s.item}>Settings</span>
            </NavLink>

            {isAuth &&
            <div className={`${s.link} ${s.hideOnMobile} ${s.itemLogout}`} onClick={logout}>
                <SignOut/>
                <span className={s.item}>Exit from account</span>
            </div>
            }
        </div>
    )
}

export default connect(mapStateToProps, { logout })(Navbar)
