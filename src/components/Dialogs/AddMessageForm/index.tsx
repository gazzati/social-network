import React, { useState } from 'react'
import s from '../style.module.scss'

type PropsType = {
  sendMessage: (messageText: string) => void
}

const AddMessageForm: React.FC<PropsType> = ({ sendMessage }) => {
  const [messageText, setMessageText] = useState('')

  const onMessageSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    sendMessage(messageText)
    setMessageText('')
  }

  return (
    <form className={`form--primary ${s.form}`} onSubmit={(e) => onMessageSend(e)}>
      <input
        className="form--primary-input"
        type="text"
        placeholder="Enter your message"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
      />
      <button className="button button--primary form--primary-button">Send</button>
    </form>
  )
}

export default AddMessageForm
