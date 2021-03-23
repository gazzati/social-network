import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { RouteComponentProps, useHistory, withRouter } from 'react-router-dom'

import { getAllDialogs, startChat } from '../../redux/dialogs-reducer'
import { getUserProfile, savePhoto, saveProfile, updateStatus } from '../../redux/profile-reducer'
import { AppStateType } from '../../redux'
import { ProfileInfoType, ProfileType } from '../../types/types'

import Preloader from '../common/Preloader'
import ProfileEditForm from './ProfileEditForm'
import ProfileInfo from './ProfileInfo'
import PostsContainer from './Posts'

import s from './style.module.scss'

type MapPropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
  getUserProfile: (userId: string) => void
  updateStatus: (status: string) => void
  savePhoto: (photo: File) => void
  saveProfile: (profile: ProfileInfoType) => Promise<any>
  startChat: (chatId?: string) => string
  getAllDialogs: (chatId?: string) => void
}

type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<{ userId: string }>

const ProfileContainer: React.FC<PropsType> = (props) => {
  const history = useHistory()
  const [editMode, setEditMode] = useState(false)
  const { userId } = props.match.params
  const isOwner = props.authorizedUserId === userId

  useEffect(() => {
    props.getUserProfile(userId)
  }, [userId])

  const onSubmit = async (formData: ProfileInfoType) => {
    await props.saveProfile(formData)
    setEditMode(false)
  }

  const onSendMessage = async () => {
    let chatId = props.chats.filter(
      (chat) => chat.participants.includes(props.profile._id) && chat.participants.length === 2
    )[0]?._id

    if (!chatId) {
      chatId = await props.startChat(props.profile._id)
    } else {
      props.getAllDialogs(chatId)
    }

    history.push(`dialogs/${chatId}`)
  }

  return (
    <div>
      {props.isLoading && <Preloader />}
      {editMode ? (
        <ProfileEditForm
          profile={props.profile as ProfileType}
          onSubmit={onSubmit}
          savePhoto={props.savePhoto}
          exitOfEditMode={() => setEditMode(false)}
          isOwner={isOwner}
          isLoading={props.isLoading}
        />
      ) : (
        <div className={s.profile}>
          {props.profile && (
            <>
              <ProfileInfo
                isOwner={isOwner}
                profile={props.profile}
                updateStatus={props.updateStatus}
                goToEditMode={() => setEditMode(true)}
                onSendMessage={onSendMessage}
              />
              <PostsContainer isOwner={isOwner} />
            </>
          )}
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state: AppStateType) => ({
  profile: state.profilePage.profile,
  authorizedUserId: state.auth.userData.id,
  isLoading: state.profilePage.isFetching,
  chats: state.dialogsPage.chats
})

export default compose<React.FC>(
  connect(mapStateToProps, {
    getUserProfile,
    updateStatus,
    savePhoto,
    saveProfile,
    startChat,
    getAllDialogs
  }),
  withRouter
)(ProfileContainer)
