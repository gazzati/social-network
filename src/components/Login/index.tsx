import React from 'react'
import { useSelector } from 'react-redux'

import { StateType } from 'src/redux'

import Preloader from 'src/components/common/Preloader'
import LoginForm from './LoginForm'
import RegistrationForm from './RegistrationForm'
import RegistrationSubmitForm from './RegistrationSubmitForm'

import s from './style.module.scss'

const Login: React.FC = () => {
  const { isFetching, verificationId } = useSelector((state: StateType) => state.auth)

  return (
    <div className={s.loginPage}>
      <div className={s.loginWrap}>
        {isFetching && <Preloader />}
        <div className={s.login}>
          <h2>LOG IN</h2>
          <LoginForm />
        </div>

        <h4>or</h4>

        <div className={s.registration}>
          {!verificationId
            ? <>
              <h2>REGISTRATION</h2>
              <RegistrationForm />
            </>
            : <>
              <h2>SUBMIT REGISTRATION</h2>
              <RegistrationSubmitForm />
            </>}
        </div>
      </div>
    </div>
  )
}

export default Login
