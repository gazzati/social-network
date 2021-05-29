import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { compose } from 'redux'
import { RouteComponentProps, useHistory, withRouter } from 'react-router-dom'

import { getUserProfile, saveProfile, updateStatus } from 'src/redux/profile'
import { StateType } from 'src/redux'
import { ProfileInfoType, ProfileType } from 'src/types/types'

import Preloader from 'src/components/common/Preloader'
import ProfileEditForm from './ProfileEditForm'
import ProfileInfo from './ProfileInfo'
import Posts from './Posts'

import s from './style.module.scss'

type PropsType = RouteComponentProps<{ userId: string }>

const Profile: React.FC<PropsType> = ({ match }) => {
  const { userData } = useSelector((state: StateType) => state.auth)
  const { profile, isFetching } = useSelector((state: StateType) => state.profile)
  const { chats } = useSelector((state: StateType) => state.dialogs)
  const dispatch = useDispatch()

  const history = useHistory()
  const [editMode, setEditMode] = useState(false)
  const { userId } = match.params
  const isOwner = userData.id === userId

  useEffect(() => {
    dispatch(getUserProfile(userId))
  }, [userId])

  const onSubmit = async (formData: ProfileInfoType) => {
    await dispatch(saveProfile(formData))
    setEditMode(false)
  }

  const onSendMessage = async () => {
    const chatId = chats.filter((chat) => chat.participants.includes(profile._id) && chat.participants.length === 2)[0]
      ?._id

    history.replace(`/dialogs/${chatId || profile._id}`, '/profile/:userId?')
  }

  return (
    <div>
      {isFetching && <Preloader />}
      {editMode ? (
        <ProfileEditForm
          profile={profile as ProfileType}
          onSubmit={onSubmit}
          exitOfEditMode={() => setEditMode(false)}
          isOwner={isOwner}
          isLoading={isFetching}
        />
      ) : (
        <div className={s.profile}>
          {profile && (
            <>
              <ProfileInfo
                isOwner={isOwner}
                profile={profile}
                updateStatus={(status) => dispatch(updateStatus(status))}
                goToEditMode={() => setEditMode(true)}
                onSendMessage={onSendMessage}
              />
              <Posts isOwner={isOwner} />
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default compose(withRouter)(Profile)
