import React from 'react'
import { connect } from 'react-redux'
import s from './style.module.scss'
import { login, registration } from '../../redux/auth-reducer'

import { AppStateType } from '../../redux'
import Preloader from '../common/Preloader'
import LoginForm from './LoginForm'
import RegistrationForm from './RegistrationForm'
import { LoginFormValuesType, RegistrationFormValuesType } from '../../types/types'

type MapStatePropsType = {
  isAuth: boolean
  isFetching: boolean
}

type MapDispatchPropsType = {
  login: (data: LoginFormValuesType) => void
  registration: (data: RegistrationFormValuesType) => void
}

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = ({ isFetching, login, registration }) => (
  <div className={s.loginPage}>
    <div className={s.loginWrap}>
      {isFetching && <Preloader />}
      <div className={s.login}>
        <h2>LOG IN</h2>
        <LoginForm onSubmit={login} />
      </div>

      <h4>or</h4>

      <div className={s.registration}>
        <h2>REGISTRATION</h2>
        <RegistrationForm onSubmit={registration} />
      </div>
    </div>
  </div>
)

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  isAuth: state.auth.isAuth,
  isFetching: state.auth.isFetching
})

export default connect(mapStateToProps, { login, registration })(Login)
