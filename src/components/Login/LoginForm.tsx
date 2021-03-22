import React, { useState } from 'react'
import s from './style.module.scss'
import viewIco from '../../assets/images/view.svg'
import { LoginFormValuesType } from '../../types/types'

type PropsType = {
  onSubmit: (data: LoginFormValuesType) => void
}

const LoginForm: React.FC<PropsType> = ({ onSubmit }) => {
  const [data, setData] = useState<LoginFormValuesType>({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(data)
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
