import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { RegistrationFormValuesType } from '../../types/types'
import { login } from '../../redux/auth-reducer'

import viewIco from '../../assets/images/view.svg'

import s from './style.module.scss'

const RegistrationForm: React.FC = () => {
  const [data, setData] = useState<RegistrationFormValuesType>({
    email: '',
    name: '',
    surname: '',
    password: ''
  })
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(login(data))
  }

  return (
    <form className={s.registration} onSubmit={(e) => handleSubmit(e)}>
      <input
        type="email"
        placeholder="email"
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
        required
      />

      <input
        type="text"
        placeholder="name"
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
        required
      />

      <input
        type="text"
        placeholder="surname"
        value={data.surname}
        onChange={(e) => setData({ ...data, surname: e.target.value })}
        required
      />

      <div className={s.passwordField}>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          autoComplete="new-password"
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

export default RegistrationForm
