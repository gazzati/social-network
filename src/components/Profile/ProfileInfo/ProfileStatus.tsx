import React, {useState, useEffect} from 'react'
import s from './style.module.css'

type PropsType = {
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
}

const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        props.isOwner && setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.status !== status && props.updateStatus(status)
    }

    const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && deactivateEditMode()
    }

    return (
        <>
            {editMode
                ? <div className={s.statusEdit}>
                    <input value={status} onChange={onStatusChange} onKeyPress={onKeyPress}
                           onBlur={deactivateEditMode} autoFocus={true}/>
                </div>

                : <div>
                <span onClick={activateEditMode}>
                    {props.status || ' '}</span>
                </div>
            }
        </>
    )
}


export default ProfileStatusWithHooks
