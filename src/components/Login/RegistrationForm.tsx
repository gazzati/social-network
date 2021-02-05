import React, {useState} from 'react'
import s from './style.module.css'
import {RegistrationFormValuesType} from './'

type PropsType = {
    onSubmit: (formData: RegistrationFormValuesType) => void
}

const RegistrationForm: React.FC<PropsType> = ({ onSubmit }) => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmit({ email, name, surname, password })
    }

    return (
        <form className={s.registration} onSubmit={e => handleSubmit(e)}>
            <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)}/>
            <input type="text" placeholder="name" value={name} onChange={e => setName(e.target.value)}/>
            <input type="text" placeholder="surname" value={surname} onChange={e => setSurname(e.target.value)}/>
            <input type="password" placeholder="password" autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)}/>

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

export default RegistrationForm
