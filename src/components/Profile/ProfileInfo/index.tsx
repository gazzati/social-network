import React, { useEffect, useState } from 'react'
import { GithubPicker } from 'react-color'
import cn from 'classnames'

import { ProfileType } from 'src/types/types'

import userPhoto from 'src/assets/images/user.png'
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
  const [openPhotoModal, setPhotoModal] = useState(false)

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
          <img
            onClick={() => setPhotoModal(true)}
            src={profile && profile.photo?.url ? profile.photo?.url : userPhoto}
            className={cn(s.mainPhoto, { [s.malePhoto]: profile.info.isMale })}
            alt="user img"
          />
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

      {openPhotoModal && profile.photo?.urlOriginal && (
        <div className={s.modal}>
          <div className={s.overlayModal} onClick={() => setPhotoModal(false)} />
          <img className={s.modalPhoto} src={profile.photo?.urlOriginal} alt="big user img" />
        </div>
      )}

      {profile && <ProfileDescription info={profile.info} />}
    </div>
  )
}

export default ProfileInfo
