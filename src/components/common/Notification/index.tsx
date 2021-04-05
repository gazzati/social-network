import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'

import { NotificationType } from 'src/types/types'
import { StateType } from 'src/redux'
import { removeNotification } from 'src/redux/app'

import close from 'src/assets/images/close.svg'
import style from './style.module.scss'

const Notification: React.FC = () => {
  const dispatch = useDispatch()
  const notifications = useSelector((state: StateType) => state.app.notifications)

  const formatMessage = (message: string) => {
    return message.split('<br />').map((paragraph: string, index: number) => (
      <p key={index.toString()} className={style.notificationMessage}>
        {paragraph}
      </p>
    ))
  }

  return (
    <>
      <div className={style.notification}>
        {notifications &&
          notifications.map((item) => (
            <div
              key={item.id}
              className={classNames(
                style.notificationContainer,
                { [style.success]: item.type === NotificationType.success },
                { [style.info]: item.type === NotificationType.info },
                { [style.error]: item.type === NotificationType.error }
              )}
            >
              {formatMessage(item.message)}
              <img src={close} alt="close" onClick={() => dispatch(removeNotification(item.id))} />
            </div>
          ))}
      </div>
    </>
  )
}

export default Notification
