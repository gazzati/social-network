import React from 'react'
import s from './style.module.scss'
import {connect} from 'react-redux'
import {login} from '../../redux/auth-reducer'
import {registration} from '../../redux/auth-reducer'
import {Redirect} from 'react-router-dom'
import {AppStateType} from '../../redux'
import Preloader from '../common/Preloader'
import LoginForm from './LoginForm'
import RegistrationForm from './RegistrationForm'

type MapStatePropsType = {
    isAuth: boolean
    isFetching: boolean
}

type MapDispatchPropsType = {
    login: (email: string, password: string) => void
    registration: (name: string, surname: string, email: string, password: string) => void
}

export type LoginFormValuesType = {
    email: string
    password: string
}

export type RegistrationFormValuesType = {
    email: string
    name: string
    surname: string
    password: string
}

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    const onSubmitLogin = (formData: LoginFormValuesType) => props.login(formData.email, formData.password)
    const onSubmitRegistration = (formData: RegistrationFormValuesType) => props.registration(formData.name, formData.surname, formData.email, formData.password)

    if(props.isAuth) {
        return <Redirect to={'profile'}/>
    }

    return (
        <div className={s.loginPage}>
            <div className={s.loginWrap}>
                {props.isFetching && <Preloader/>}
                <div className={s.login}>
                    <h2>LOG IN</h2>
                    <LoginForm onSubmit={onSubmitLogin}/>
                </div>

                <h4>or</h4>

                <div className={s.registration}>
                    <h2>REGISTRATION</h2>
                    <RegistrationForm onSubmit={onSubmitRegistration}/>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    isFetching: state.auth.isFetching
})

export default connect(mapStateToProps, { login, registration })(Login)
