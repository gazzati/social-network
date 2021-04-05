import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { login } from 'src/redux/auth'
import { LoginFormValuesType } from 'src/types/types'

import viewIco from 'src/assets/images/view.svg'

import s from './style.module.scss'

const LoginForm: React.FC = () => {
  const [data, setData] = useState<LoginFormValuesType>({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(login(data))
  }

  return (
    <form className={s.login} onSubmit={(e) => handleSubmit(e)}>
      <input
        type="email"
        placeholder="email"
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
        required
      />

      <div className={s.passwordField}>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          required
        />
        {data.password && (
          <img className={s.showPassword} onClick={() => setShowPassword(!showPassword)} src={viewIco} alt="" />
        )}
      </div>

      <div>
        <button className="button button--primary" type="submit">
          Log In
        </button>
      </div>
    </form>
  )
}

export default LoginForm
