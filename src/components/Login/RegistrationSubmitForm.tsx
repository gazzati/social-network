import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StateType } from 'src/redux'
import { submitRegistration } from 'src/redux/auth'

import s from './style.module.scss'

const RegistrationSubmitForm: React.FC = () => {
  const [verificationCode, setVerificationCode] = useState<string>('')
  const id = useSelector((state: StateType) => state.auth.verificationId)
  const dispatch = useDispatch()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(submitRegistration({id, verificationCode: Number(verificationCode)}))
  }

  return (
    <form className={s.registration} onSubmit={e => handleSubmit(e)}>
      <input
        type='text'
        placeholder='Verification code'
        value={verificationCode}
        minLength={4}
        maxLength={4}
        onChange={e => setVerificationCode(e.target.value)}
        style={{maxWidth: 185}}
        required
      />

      <div>
        <button className='button button--primary' type='submit'>
          Submit
        </button>
      </div>
    </form>
  )
}

export default RegistrationSubmitForm
