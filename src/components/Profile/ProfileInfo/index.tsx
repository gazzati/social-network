import React, { useEffect, useState } from 'react'
import { GithubPicker } from 'react-color'
import s from '../style.module.scss'
import userPhoto from '../../../assets/images/user.png'
import ProfileStatus from './ProfileStatus'
import vk from '../../../assets/images/contacts/vk.svg'
import instagram from '../../../assets/images/contacts/instagram.svg'
import github from '../../../assets/images/contacts/github.svg'
import twitter from '../../../assets/images/contacts/twitter.svg'
import youtube from '../../../assets/images/contacts/youtube.svg'
import facebook from '../../../assets/images/contacts/facebook.svg'
import { ContactsType, ProfileInfoType, ProfileType } from '../../../types/types'

type PropsType = {
  profile: ProfileType
  updateStatus: (status: string) => void
  isOwner: boolean
  goToEditMode: () => void
}

const ProfileInfo: React.FC<PropsType> = ({ profile, updateStatus, isOwner, goToEditMode }) => {
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
          {isOwner && (
            <button className="button button--primary" onClick={goToEditMode}>
              Edit my profile
            </button>
          )}
        </div>
      )}

      {profile && <ProfileData info={profile.info} />}
    </div>
  )
}

type ProfileDataPropsType = {
  info: ProfileInfoType
}

const ProfileData: React.FC<ProfileDataPropsType> = ({ info }) => (
  <div className={s.description}>
    <div className={s.aboutMe}>
      <p>About me</p>
      <span>{info.aboutMe}</span>
    </div>

    {info.lookingForAJob && (
      <div className={s.skills}>
        <p>Skills</p>
        <span>{info.lookingForAJobDescription}</span>
      </div>
    )}

    <div className={s.contactsList}>
      {info.contacts &&
        Object.keys(info.contacts).map((key) => (
          <Contact key={key} contactTitle={key} contactValue={info.contacts[key as keyof ContactsType] || ''} />
        ))}
    </div>
  </div>
)

type ContactPropsType = {
  contactTitle: string
  contactValue: string
}

const Contact: React.FC<ContactPropsType> = ({ contactTitle, contactValue }) => {
  if (contactValue) {
    return (
      <div className={s.contacts}>
        {contactTitle === 'github' && contactValue !== '' && (
          <a href={contactValue} target="_blank" rel="noopener noreferrer">
            <img src={github} className={s.gitHubIcon} alt="" />
            <p>{contactValue}</p>
          </a>
        )}

        {contactTitle === 'vk' && contactValue !== '' && (
          <a href={contactValue} target="_blank" rel="noopener noreferrer">
            <img src={vk} className={s.vkIcon} alt="" />
            <p>{contactValue}</p>
          </a>
        )}

        {contactTitle === 'facebook' && contactValue !== '' && (
          <a href={contactValue} target="_blank" rel="noopener noreferrer">
            <img src={facebook} alt="" />
            <p>{contactValue}</p>
          </a>
        )}

        {contactTitle === 'instagram' && contactValue !== '' && (
          <a href={contactValue} target="_blank" rel="noopener noreferrer">
            <img src={instagram} alt="" />
            <p>{contactValue}</p>
          </a>
        )}

        {contactTitle === 'twitter' && contactValue !== '' && (
          <a href={contactValue} target="_blank" rel="noopener noreferrer">
            <img src={twitter} alt="" />
            <p>{contactValue}</p>
          </a>
        )}

        {contactTitle === 'youtube' && contactValue !== '' && (
          <a href={contactValue} target="_blank" rel="noopener noreferrer">
            <img src={youtube} alt="" />
            <p>{contactValue}</p>
          </a>
        )}
      </div>
    )
  }
  return null
}

export default ProfileInfo
