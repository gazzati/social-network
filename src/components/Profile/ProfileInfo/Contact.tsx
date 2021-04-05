import React from 'react'

import github from 'src/assets/images/contacts/github.svg'
import vk from 'src/assets/images/contacts/vk.svg'
import facebook from 'src/assets/images/contacts/facebook.svg'
import instagram from 'src/assets/images/contacts/instagram.svg'
import twitter from 'src/assets/images/contacts/twitter.svg'
import youtube from 'src/assets/images/contacts/youtube.svg'

import s from '../style.module.scss'

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

export default Contact
