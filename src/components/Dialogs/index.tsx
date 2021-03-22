import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import Dialogs from './Dialogs'
import { getAllDialogs, sendMessage } from '../../redux/dialogs-reducer'
import { AppStateType } from '../../redux'

type MapPropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
  sendMessage: (chatId: string, message: string) => void
  getAllDialogs: (chatId?: string) => void
}

type PathParamsType = {
  chatId: string
}

type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>

const DialogsContainer: React.FC<PropsType> = (props) => {
  const currentChat = props.match.params.chatId || 'all'
  const [isCurrentChatChanged, setIsCurrentChatChanged] = useState(false)

  useEffect(() => {
    !props.chats.length && props.getAllDialogs(currentChat)
    // eslint-disable-next-line
  }, [])

  const setCurrentChat = (chatId: string) => {
    if (!isCurrentChatChanged) {
      setIsCurrentChatChanged(true)
    }
    if (chatId !== currentChat) {
      props.getAllDialogs(chatId)
    }
  }

  return (
    <Dialogs
      chats={props.chats}
      messages={props.messages}
      isLoading={props.isLoading}
      sendMessage={props.sendMessage}
      authorizedUserId={props.authorizedUserId || ''}
      currentChat={currentChat}
      setCurrentChat={setCurrentChat}
      isCurrentChatChanged={isCurrentChatChanged}
    />
  )
}

const mapStateToProps = (state: AppStateType) => ({
  chats: state.dialogsPage.chats,
  messages: state.dialogsPage.messages,
  isLoading: state.dialogsPage.isFetching,
  authorizedUserId: state.auth.userData.id
})

export default compose<React.FC>(connect(mapStateToProps, { sendMessage, getAllDialogs }), withRouter)(DialogsContainer)
