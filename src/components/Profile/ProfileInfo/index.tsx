import React, { useEffect, useState } from 'react'
import { GithubPicker } from 'react-color'

import { ProfileType } from '../../../types/types'

import userPhoto from '../../../assets/images/user.png'
import ProfileStatus from './ProfileStatus'

import s from '../style.module.scss'
import ProfileDescription from './ProfileDescription'

type PropsType = {
  profile: ProfileType
  updateStatus: (status: string) => void
  isOwner: boolean
  goToEditMode: () => void
  onSendMessage: () => void
}

const ProfileInfo: React.FC<PropsType> = ({ profile, updateStatus, isOwner, goToEditMode, onSendMessage }) => {
  const [colorMode, setColorMode] = useState(false)

  useEffect(() => {
    document
      .getElementById('user-color')
      ?.setAttribute('style', `background-color: ${localStorage.getItem('user-color') || '#3827a0'}`)
  }, [])

  const changeColor = (color: any) => {
    document.getElementById('user-color')?.setAttribute('style', `background-color: ${color.hex}`)
    localStorage.setItem('user-color', String(color.hex))
    setColorMode(false)
  }

  return (
    <div className={s.infoBlock} onDoubleClick={() => setColorMode(false)}>
      {colorMode && (
        <div className={s.chooserColor}>
          <GithubPicker
            onChange={changeColor}
            width="215px"
            colors={['#d435b7', '#ff2600', '#ffd900', '#65d435', '#61dafb', '#359ad4', '#6d57f6', '#3827a0']}
          />
        </div>
      )}
      {profile && (
        <div className={s.mainInfo}>
          <label id="user-color" className={s.colorBlock} onClick={() => setColorMode(!colorMode)} />
          <img src={profile && profile.photo?.url ? profile.photo?.url : userPhoto} className={s.mainPhoto} alt="" />
          <div className={s.name}>{`${profile.info.name} ${profile.info.surname}`}</div>
          <div className={s.status}>
            <ProfileStatus status={profile.status} updateStatus={updateStatus} isOwner={isOwner} />
          </div>
          {isOwner ? (
            <button className="button button--primary" onClick={goToEditMode}>
              Edit my profile
            </button>
          ) : (
            <button className="button button--primary" onClick={onSendMessage}>
              Send message
            </button>
          )}
        </div>
      )}

      {profile && <ProfileDescription info={profile.info} />}
    </div>
  )
}

export default ProfileInfo
