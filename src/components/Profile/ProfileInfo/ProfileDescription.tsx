import React from 'react'

import { ContactsType, ProfileInfoType } from '../../../types/types'

import s from '../style.module.scss'
import Contact from './Contact'

type ProfileDescriptionType = {
  info: ProfileInfoType
}

const ProfileDescription: React.FC<ProfileDescriptionType> = ({ info }) => (
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

    <p>My contacts</p>
    <div className={s.contactsList}>
      {info.contacts &&
        Object.keys(info.contacts).map((key) => (
          <Contact key={key} contactTitle={key} contactValue={info.contacts[key as keyof ContactsType] || ''} />
        ))}
    </div>
  </div>
)

export default ProfileDescription
