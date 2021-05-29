import React, { useEffect, useState } from 'react'
import s from '../style.module.scss'

type PropsType = {
  status: string
  updateStatus: (status: string) => void
  isOwner: boolean
}

const ProfileStatus: React.FC<PropsType> = ({ status, isOwner, updateStatus }) => {
  const [editMode, setEditMode] = useState(false)
  const [statusValue, setStatusValue] = useState(status)

  useEffect(() => {
    setStatusValue(status)
  }, [status])

  const activateEditMode = () => {
    isOwner && setEditMode(true)
  }

  const deactivateEditMode = () => {
    setEditMode(false)
    if (status !== statusValue) {
      updateStatus(statusValue)
    }
  }

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && deactivateEditMode()
  }

  return (
    <>
      {editMode ? (
        <div className={s.statusEdit}>
          <input
            value={statusValue}
            onChange={(e) => setStatusValue(e.target.value)}
            onKeyPress={onKeyPress}
            onBlur={deactivateEditMode}
            autoFocus
          />
        </div>
      ) : (
        <div>
          <span onClick={activateEditMode}>{status || ' '}</span>
        </div>
      )}
    </>
  )
}

export default ProfileStatus
