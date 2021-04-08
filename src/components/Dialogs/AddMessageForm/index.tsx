import React, { useState } from 'react'
import s from '../style.module.scss'

type PropsType = {
  disabled: boolean
  sendMessage: (messageText: string) => void
}

const AddMessageForm: React.FC<PropsType> = ({ disabled, sendMessage }) => {
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
        disabled={disabled}
      />
      <button
        className={`button button--primary form--primary-button${disabled ? ' button--disabled' : ''}`}
        disabled={disabled}
      >
        Send
      </button>
    </form>
  )
}

export default AddMessageForm
