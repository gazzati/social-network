import React, {useState} from 'react'
import s from './style.module.css'
import {LoginFormValuesType} from './'

type PropsType = {
    onSubmit: (formData: LoginFormValuesType) => void
}

const LoginForm: React.FC<PropsType> = ({ onSubmit }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmit({ email, password })
    }

    return (
        <form className={s.login} onSubmit={e => handleSubmit(e)}>
            <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)}/>
            <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)}/>

            {/*{error && <div className={style.formSummaryError}>
                {error}
            </div>
            }*/}
            <div>
                <button className="button button--primary" type="submit">Log In</button>
            </div>
        </form>
    )
}

export default LoginForm
