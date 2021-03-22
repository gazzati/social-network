import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import Profile from './Profile'
import ProfileEditForm from './ProfileEditForm'
import { getUserProfile, savePhoto, saveProfile, updateStatus } from '../../redux/profile-reducer'
import { AppStateType } from '../../redux'
import { ProfileInfoType, ProfileType } from '../../types/types'
import Preloader from '../common/Preloader'

type MapPropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
  getUserProfile: (userId: string) => void
  updateStatus: (status: string) => void
  savePhoto: (photo: File) => void
  saveProfile: (profile: ProfileInfoType) => Promise<any>
}

type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<{ userId: string }>

const ProfileContainer: React.FC<PropsType> = (props) => {
  const [editMode, setEditMode] = useState(false)
  const { userId } = props.match.params
  const isOwner = props.authorizedUserId === userId

  const onSubmit = async (formData: ProfileInfoType) => {
    await props.saveProfile(formData)
    setEditMode(false)
  }

  useEffect(() => {
    props.getUserProfile(userId)
  }, [userId])

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
        <Profile
          savePhoto={props.savePhoto}
          isOwner={isOwner}
          profile={props.profile}
          updateStatus={props.updateStatus}
          goToEditMode={() => setEditMode(true)}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state: AppStateType) => ({
  profile: state.profilePage.profile,
  authorizedUserId: state.auth.userData.id,
  isLoading: state.profilePage.isFetching
})

export default compose<React.FC>(
  connect(mapStateToProps, {
    getUserProfile,
    updateStatus,
    savePhoto,
    saveProfile
  }),
  withRouter
)(ProfileContainer)
